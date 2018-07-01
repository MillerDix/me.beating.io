import React, { Component } from 'react';
import {Rounded} from '../../common/button/button.js';
import request from '../../common/utils/request.js';
import api from '../../common/utils/api.js';
import style from './music_visualizer.css';

class MusicVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // file: null,
            fileName: null,
            audioContext: null,
            source: null,
            buffer: null,
            playerStatus: 3   // 0: finish or before start, 1: playing, 2: paused, 3: loading, 4: error;
        };

        // this._fileUploaded = this._fileUploaded.bind(this);
        this._start = this._start.bind(this);
        this._audioApi = this._audioApi.bind(this);
        this._visualize = this._visualize.bind(this);
        this._drawSpectrum = this._drawSpectrum.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
    }

    componentDidMount() {
        this._audioApi();
        request({
            url: api.assets.audios.pneumatic_tokyo,
            method: 'get'
        }).then(res => {
            return res.blob();
        }).then(blob => {
            let fr = new FileReader();
            fr.onload = (e) => {
                let fileResult = e.target.result, audioContext = this.state.audioContext, self = this;
                audioContext.decodeAudioData(fileResult, function(buffer) {
                    // self._visualize(audioContext, buffer);
                    self.setState({ buffer, playerStatus: 0 });
                }, function(e) { self.setState({ playerStatus: 4 }); });
            }
            fr.readAsArrayBuffer(blob);
        }).catch(err => {
            console.log(err);
            this.setState({ playerStatus: 4 });
        });
    }

    componentWillUnmount() {
        const { audioContext } = this.state;
        audioContext.close();
    }

    _start() {
        const { audioContext, buffer } = this.state;
        this._visualize(audioContext, buffer);
    }

    _visualize(audioContext, buffer) {
        let audioBufferSouceNode = audioContext.createBufferSource(), analyser = audioContext.createAnalyser();
        
        analyser.fftSize = 512;
        analyser.maxDecibels = 20;
        analyser.minDecibels = -60;

        audioBufferSouceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        audioBufferSouceNode.buffer = buffer;
        audioBufferSouceNode.start(0);
        
        this._drawSpectrum(analyser);
    }
    
    _drawSpectrum(analyser) {
        let signalLength = analyser.fftSize / 2;
        var canvas = document.getElementById('canvas'),
            cwidth = canvas.width,
            cheight = canvas.height - 2,
            meterWidth = 14, //能量条的宽度
            gap = 4,
            defaultHeight = gap,
            meterNum = cwidth / (meterWidth + gap), //计算当前画布上能画多少条
            step = Math.floor(signalLength / meterNum),
            ctx = canvas.getContext('2d');
            
        ctx.fillStyle = "#DFD7DC";
        for (var j = 0; j < signalLength; j+=step) {
            ctx.fillRect((j / step) * (gap + meterWidth), cheight - defaultHeight, meterWidth, defaultHeight);
        }

        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            ctx.clearRect(0, 0, cwidth, cheight - defaultHeight); // clear previous canvas
            for (var i = 0; i < signalLength; i+=step) {
                var value = array[i];
                ctx.fillRect((i / step) * (gap + meterWidth), cheight - value * 0.5 - defaultHeight, meterWidth, value / 2);
            }
            requestAnimationFrame(drawMeter);
        }
        requestAnimationFrame(drawMeter);
    }

    // _fileUploaded(file) {
    //     this.setState({ file, fileName: file.name });
    // }

    _audioApi() {
        let AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        this.setState({audioContext: new AudioContext()});
    }

    togglePlay() {
        const { playerStatus, audioContext } = this.state;
        if(playerStatus === 0) { this._start(); this.setState({ playerStatus: 1 }); }
        else if(playerStatus === 1) { audioContext.suspend(); this.setState({ playerStatus: 2}); }
        else { audioContext.resume(); this.setState({ playerStatus: 1}); }
    }

    render() {
        const { playerStatus } = this.state;
        let playerControlTitle = '';
        switch(playerStatus) {
            case 0:
                playerControlTitle = 'START';
                break;
            case 1:
                playerControlTitle = 'PAUSE';
                break;
            case 2:
                playerControlTitle = 'RESUME';
                break;
            case 3:
                playerControlTitle = 'LOADING';
                break;
            case 4:
                playerControlTitle = 'ERROR';
                break;
            default:
                break;
        }
        return (
            <div className={style.container} style={{backgroundImage: "url('http://res.cloudinary.com/millerd/image/upload/v1530364545/Beatinglog/home/pneumatic_tokyo_cover.jpg')"}}>
                {/* <input type="file" onChange={(evt) => this._fileUploaded(evt.target.files[0])} /> */}
                <span className={style.play_control}>
                    <Rounded disabled={playerStatus === 3 || playerStatus === 4} onClick={() => this.togglePlay()}>{playerControlTitle}</Rounded>
                </span>
                <canvas id='canvas' width="1000" className={style.canvas}></canvas>
            </div>
        );
    }
}

export default MusicVisualizer;