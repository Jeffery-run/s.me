type RequestType = 'get' | 'post' | 'delete' | 'put';
type VisualizerOption = {
  method?: RequestType;
  canvas: HTMLCanvasElement;
  done?: Function
  width?: number,
  height?:number
}
class Visualizer {
  audioContext: AudioContext | null;

  method: RequestType = 'get';

  animationId: any;

  source: AudioBufferSourceNode | null;

  analyzer: AnalyserNode | null;

  canvas: HTMLCanvasElement;

  playComplete: boolean;

  playingUrl?: string;

  contextTime: any;

  done: Function = () => {};

  width: number;

  height:number;

  constructor({
    method, canvas, done, width, height,
  } : VisualizerOption) {
    this.audioContext = null;
    this.method = method || this.method;
    this.animationId = null;
    this.source = null;
    this.analyzer = null;
    this.canvas = canvas;
    this.playComplete = false;
    this.done = done || this.done;
    this.width = width || 400;
    this.height = height || 300;
    this.init();
  }

  init() {
    this.prepareApi();
  }

  play(url: string) {
    if (this.playingUrl === url) {
      this.audioContext?.resume();
      return;
    }
    this.clear();
    this.playingUrl = url;
    this.start();
  }

  async start() {
    const { audioContext } = this;
    if (!audioContext) return;
    const res = await fetch(this.playingUrl!, {
      method: this.method,
    });

    if (res.status >= 200 && res.status < 300) {
      const buffer = await res.arrayBuffer();
      audioContext.decodeAudioData(buffer, (bf) => {
        this.visualize(audioContext, bf);
      });
    } else {
      Visualizer.updateInfo(res.statusText);
    }
  }

  pause() {
    this.audioContext?.suspend();
  }

  visualize(audioContext : AudioContext, buffer:any) {
    const audioBufferSouceNode = audioContext.createBufferSource();
    const analyser = audioContext.createAnalyser();
    audioBufferSouceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    audioBufferSouceNode.buffer = buffer;
    if (!audioBufferSouceNode.start) {
      audioBufferSouceNode.start = audioBufferSouceNode.noteOn; // in old browsers use noteOn method
      audioBufferSouceNode.stop = audioBufferSouceNode.noteOff; // in old browsers use noteOff method
    }
    audioBufferSouceNode.start(0);
    this.source = audioBufferSouceNode;
    this.analyzer = analyser;
    audioBufferSouceNode.addEventListener('ended', this.sourceListener);
    this.drawSpectrum(analyser);
  }

  sourceListener = () => {
    this.playingUrl = undefined;
    this.stopDraw();
    this.done();
  };

  clear() {
    this.audioContext?.resume();
    this.stopDraw();
    this.source?.removeEventListener('ended', this.sourceListener);
    this.source?.stop();
  }

  resize(width?:number, height?:number) {
    this.width = width || this.width;
    this.height = height || this.height;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  drawSpectrum(analyser: AnalyserNode) {
    this.resize();
    const ctx = this.canvas.getContext('2d')!;
    const gradient = ctx!.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(1, '#f00');
    gradient.addColorStop(0.75, '#ff0');
    gradient.addColorStop(0.65, '#0f0');
    gradient.addColorStop(0.5, '#272822');
    gradient.addColorStop(0.35, '#0f0');
    gradient.addColorStop(0.25, '#ff0');
    gradient.addColorStop(0, '#f00');
    const drawMeter = () => {
      const { width: cwidth, height: cheight } = this;
      const halfHeight = cheight / 2;
      const helfWidth = cwidth / 2;
      const meterWidth = cwidth > 700 ? 10 : 6;
      const meterNumber = 40;
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      const step = Math.round(array.length / meterNumber);
      ctx.clearRect(0, 0, cwidth, cheight);
      for (let i = 0; i < meterNumber; i++) {
        const value = array[i * step];
        const valueX2 = value * 2;
        ctx.fillStyle = gradient;
        ctx.fillRect(i * (meterWidth + 2) + helfWidth, halfHeight - value, meterWidth, valueX2); // the meter
        ctx.fillRect(helfWidth - (i + 1) * (meterWidth + 2), halfHeight - value, meterWidth, valueX2); // the meter
      }
      this.animationId = requestAnimationFrame(drawMeter);
    };
    this.animationId = requestAnimationFrame(drawMeter);
  }

  stopDraw() {
    cancelAnimationFrame(this.animationId);
  }

  prepareApi() {
    // fix browser vender for AudioContext and requestAnimationFrame
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
    try {
      this.audioContext = new AudioContext();
    } catch (e) {
      Visualizer.updateInfo('Your browser does not support AudioContext!');
    }
  }

  static updateInfo(message: string) {
    alert(message);
  }
}

export default Visualizer;
