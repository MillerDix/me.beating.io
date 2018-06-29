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
        
        analyser.fftSize = 512;
        analyser.maxDecibels = -10;
        analyser.minDecibels = -50;
        console.log(analyser);

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
            meterWidth = 10, //能量条的宽度
            gap = 2,
            defaultHeight = 2 * gap,
            meterNum = cwidth / (meterWidth + gap), //计算当前画布上能画多少条
            step = Math.floor(analyser.fftSize / 2 / meterNum),
            ctx = canvas.getContext('2d');
        
        ctx.fillStyle = "#DFD7DC";
        for (var j = 0; j < meterNum; j+=step) {
            ctx.fillRect((j / step) * (gap + meterWidth), cheight - defaultHeight, meterWidth, defaultHeight);
        }
        console.log('canvas');
        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            ctx.clearRect(0, 0, cwidth, cheight - defaultHeight); // clear previous canvas
            for (var i = 0; i < meterNum; i+=step) {
                var value = array[i];
                ctx.fillRect((i / step) * (gap + meterWidth), cheight - value * 0.5 - defaultHeight, meterWidth, value / 2);
            }
            requestAnimationFrame(drawMeter);
        }
        requestAnimationFrame(drawMeter);
    }

    _fileUploaded(file) {
        this.setState({ file, fileName: file.name });
    }

    _audioApi() {
        let AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        this.setState({audioContext: new AudioContext()});
    }

    resume() {
        this._start();
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