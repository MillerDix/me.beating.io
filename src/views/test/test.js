import React, { Component } from 'react';
import {Rounded} from '../../common/button/button.js';
import request from '../../common/utils/request.js';
import api from '../../common/utils/api.js';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // file: null,
            fileName: null,
            audioContext: null,
            source: null,
            buffer: null,
            playerStatus: 0   // 0: finish or before start, 1: playing, 2: paused
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
            url: api.assets.audios.sunburst,
            method: 'get'
        }).then(res => {
            return res.blob();
        }).then(blob => {
            let fr = new FileReader();
            fr.onload = (e) => {
                let fileResult = e.target.result, audioContext = this.state.audioContext, self = this;
                audioContext.decodeAudioData(fileResult, function(buffer) {
                    // self._visualize(audioContext, buffer);
                    self.setState({ buffer });
                }, function(e) { console.log("文件解码失败"); });
            }
            fr.readAsArrayBuffer(blob);
        });
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
            meterWidth = 10, //能量条的宽度
            gap = 2,
            defaultHeight = 2 * gap,
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
        return (
            <div>
                {/* <input type="file" onChange={(evt) => this._fileUploaded(evt.target.files[0])} /> */}
                <Rounded
                    onClick={() => this.togglePlay()}
                >
                {playerStatus === 0 ?
                    'START' : (playerStatus === 1 ? 'PAUSE' : 'RESUME')
                }
                </Rounded>
                {/* <Rounded onClick={() => this.pause()}>PAUSE</Rounded> */}
                <canvas id='canvas' width="800" height="350"></canvas>
            </div>
        );
    }
}

export default Test;