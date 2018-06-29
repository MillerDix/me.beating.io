import React, { Component } from 'react';
import {Rounded} from '../../common/button/button.js';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName: null,
            audioContext: null,
            source: null
        };

        this._fileUploaded = this._fileUploaded.bind(this);
        this._start = this._start.bind(this);
        this._audioApi = this._audioApi.bind(this);
        this._visualize = this._visualize.bind(this);
        this._drawSpectrum = this._drawSpectrum.bind(this);
    }

    componentDidMount() {
        this._audioApi();
    }

    _start() {
        let fr = new FileReader();
        fr.onload = (e) => {
            let fileResult = e.target.result, audioContext = this.state.audioContext, self = this;
            audioContext.decodeAudioData(fileResult, function(buffer) {
                self._visualize(audioContext, buffer);
            }, function(e) { console.log("文件解码失败"); });
        }
        fr.readAsArrayBuffer(this.state.file);
    }

    _visualize(audioContext, buffer) {
        let audioBufferSouceNode = audioContext.createBufferSource(), analyser = audioContext.createAnalyser();

        // analyser.maxDecibels = 0;
        audioBufferSouceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        audioBufferSouceNode.buffer = buffer;
        audioBufferSouceNode.start(0);

        this._drawSpectrum(analyser);
    }

    _drawSpectrum(analyser) {
        var canvas = document.getElementById('canvas'),
            cwidth = canvas.width,
            cheight = canvas.height - 2,
            meterWidth = 2, //能量条的宽度
            meterNum = 1024 / 4, //计算当前画布上能画多少条
            ctx = canvas.getContext('2d'),
            //定义一个渐变样式用于画图
            gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(1, '#0f0');
        gradient.addColorStop(0.5, '#ff0');
        gradient.addColorStop(0, '#f00');
        ctx.fillStyle = gradient;
        var drawMeter = function() {
            var array = new Uint8Array(analyser.fftSize);
            analyser.getByteFrequencyData(array);
            ctx.clearRect(0, 0, cwidth, cheight); // clear previous canvas
            for (var i = 0; i < meterNum; i++) {
                // var value = (array[i] - previousArray[i]) > 0 ? (array[i] - previousArray[i]) : (array[i] - previousArray[i]) * -1;
                var value = array[i];
                ctx.fillRect(i * 4, cheight - value, meterWidth, value);
            }
            requestAnimationFrame(drawMeter);
        }
        requestAnimationFrame(drawMeter);
    }

    _fileUploaded(file) {
        this.setState({ file, fileName: file.name }, () => this._start());
    }

    _audioApi() {
        let AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        this.setState({audioContext: new AudioContext()});
    }

    resume() {
        
    }

    render() {
        return (
            <div>
                TEST.JS
                <input type="file" onChange={(evt) => this._fileUploaded(evt.target.files[0])} />
                <Rounded onClick={() => this.resume()}>START</Rounded>
                <canvas id='canvas' width="1400" height="350"></canvas>
            </div>
        );
    }
}

export default Test;