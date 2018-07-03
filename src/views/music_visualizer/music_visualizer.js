import React, { Component } from 'react';
import {Rounded} from '../../common/button/button.js';
import request from '../../common/utils/request.js';
import api from '../../common/utils/api.js';
import style from './music_visualizer.css';

let el_player = null;
class MusicVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: null,
            audioContext: null,
            source: null,
            buffer: null,
            clientWidthForCanvas: (document.documentElement.clientWidth - 500) * 1.5, // the ratio 1.5 === canvas.default.height / canvas.style.height
            playerStatus: 3,  // 1: playing, 2: paused, 3: loading, 4: error;
            playedPercent: '0%'
        };

        this._audioApi = this._audioApi.bind(this);
        this._drawSpectrum = this._drawSpectrum.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.canPlay = this.canPlay.bind(this);
        this.timeUpdate = this.timeUpdate.bind(this);
        this.suspend = this.suspend.bind(this);
        this.progress = this.progress.bind(this);
    }

    canPlay() {
        // the first frame is ready to go
        this._audioApi();
    }

    timeUpdate() {
        this.setState({ playedPercent: el_player.currentTime / el_player.duration * 100 + '%' });
    }

    suspend() {
        this.setState({ playerStatus: 2 });
    }

    progress() {
        this.setState({ playerStatus: 3 });
    }

    componentDidMount() {
        el_player = document.getElementsByTagName('audio')[0];

        el_player.addEventListener("canplay", this.canPlay);
        el_player.addEventListener("timeupdate", this.timeUpdate);
        el_player.addEventListener("suspend", this.suspend);
        el_player.addEventListener('progress', this.progress);
    }

    componentWillUnmount() {
        const { audioContext } = this.state;
        el_player.removeEventListener("canplay", this.canPlay);
        el_player.removeEventListener("timeupdate", this.timeUpdate);
        el_player.removeEventListener("suspend", this.suspend);
        el_player.removeEventListener('progress', this.progress);
        audioContext.close();
    }
    
    _drawSpectrum(analyser) {
        let signalLength = analyser.fftSize / 2;
        var canvas = document.getElementById('canvas'),
        cwidth = canvas.width,
        cheight = canvas.height - 2,
        meterWidth = 14, //能量条的宽度
        gap = 4,
        defaultHeight = gap,
        meterNum = Math.floor(cwidth / (meterWidth + gap)), //计算当前画布上能画多少条
        step = Math.floor(signalLength / meterNum),
        ctx = canvas.getContext('2d');
        
        ctx.fillStyle = "#DFD7DC";
        for (var j = 0; j < signalLength; j+=step) {
            ctx.fillRect((j / step) * (gap + meterWidth), cheight - defaultHeight, meterWidth, defaultHeight);
        }
        
        var drawMeter = function() {
            if(!el_player.paused) {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                ctx.clearRect(0, 0, cwidth, cheight - defaultHeight); // clear previous canvas
                for (var i = 0; i < signalLength; i+=step) {
                    var value = array[i];
                    ctx.fillRect((i / step) * (gap + meterWidth), cheight - value * 0.5 - defaultHeight, meterWidth, value / 2);
                }
            }
            
            requestAnimationFrame(drawMeter);
        }
        requestAnimationFrame(drawMeter);
    }

    _audioApi() {
        let AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        let audioContext = new AudioContext();
        this.setState({audioContext});

        let audioBufferSouceNode = audioContext.createMediaElementSource(el_player), analyser = audioContext.createAnalyser();
        
        analyser.fftSize = 512;
        analyser.maxDecibels = 20;
        analyser.minDecibels =  -60;

        audioBufferSouceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        
        this._drawSpectrum(analyser);
    }

    togglePlay() {
        const { playerStatus } = this.state;
        if(playerStatus === 1) { el_player.pause(); this.setState({ playerStatus: 2}); }
        else if(playerStatus === 2) { el_player.play(); this.setState({ playerStatus: 1}); }
    }

    render() {
        const { playerStatus, clientWidthForCanvas, playedPercent } = this.state;
        let playerControlTitle = '';
        switch(playerStatus) {
            case 1:
                playerControlTitle = 'PAUSE';
                break;
            case 2:
                playerControlTitle = 'PLAY';
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
                <span className={style.play_control}>
                    <Rounded disabled={playerStatus === 3 || playerStatus === 4} onClick={() => this.togglePlay()}>{playerControlTitle}</Rounded>
                </span>
                <canvas id='canvas' width={clientWidthForCanvas} className={style.canvas}></canvas>
                <div className={style.progress} style={{width: clientWidthForCanvas / 1.5 - 6 + 'px'}}><div className={style.percent} style={{width: playedPercent, maxWidth: clientWidthForCanvas / 1.5 - 8 + 'px'}}></div></div>
                <audio crossOrigin="anonymous" src={api.assets.audios.pneumatic_tokyo} />
            </div>
        );
    }
}

export default MusicVisualizer;