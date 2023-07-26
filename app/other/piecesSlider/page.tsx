'use client';

import React, { memo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import anime from 'animejs';
import Pieces from '@/app/_utils/pieces';

const SliderWrapper = styled.div`
  position:relative;
  .pieces_slider_canvas{
    position:relative;
    width:100%;
    height:calc(100vh - 65px);
    transition: 0.2s opacity;
    &.pieces_slider_canvas_hidden{
      opacity: 0;
      transition-duration: 0.3s;
    }
  }
  .pieces_slider{
    height: 0;
    overflow: hidden;
    .pieces_image{
      visibility:hidden;
      max-width:600px;
      max-height:400px;
    }
  }
`;

const page = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement[]>([]);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const sliderItems = [
    { src: '/other/slider_0.jpg', text: '001' },
    { src: '/other/slider_1.jpg', text: '002' },
    { src: '/other/slider_2.jpg', text: '003' },
    { src: '/other/slider_3.jpg', text: '004' },
    { src: '/other/slider_4.jpg', text: '005' },
  ];
  useEffect(() => {
    const slidersLength = sliderItems.length;
    let currentIndex = 0;
    let currentImageIndex : number;
    let currentTextIndex : number;
    let currentNumberIndex : number;
    function updateIndexes() {
      currentImageIndex = currentIndex * 3;
      currentTextIndex = currentImageIndex + 1;
      currentNumberIndex = currentImageIndex + 2;
    }
    updateIndexes();
    const textIndexes = [];
    const numberIndexes : number[] = [];
    let windowWidth = window.innerWidth;
    let piecesSlider : any;
    // image option
    const ImageOptions = {
      angle: 45,
      extraSpacing: { extraX: 100, extraY: 200 },
      piecesWidth: () => Pieces.random(50, 200),
      ty: () => Pieces.random(-400, 400),
    };
    // text option
    const textOptions = {
      color: 'white',
      backgroundColor: '#5104ab',
      fontSize: () => (windowWidth > 720 ? 50 : 30),
      padding: '15 20 10 20',
      angle: -45,
      piecesSpacing: 2,
      extraSpacing: { extraX: 0, extraY: 300 },
      piecesWidth: () => Pieces.random(50, 200),
      ty: () => Pieces.random(-200, 200),
      translate: () => {
        if (windowWidth > 1120) return { translateX: 200, translateY: 200 };
        if (windowWidth > 720) return { translateX: 0, translateY: 200 };
        return { translateX: 0, translateY: 100 };
      },
    };
    // number option
    const numberOptions = {
      color: 'white',
      backgroundColor: '#5104ab',
      fontSize: () => (windowWidth > 720 ? 60 : 20),
      padding: () => (windowWidth > 720 ? '18 35 10 38' : '18 25 10 28'),
      angle: 0,
      piecesSpacing: 2,
      extraSpacing: { extraX: 10, extraY: 10 },
      piecesWidth: 35,
      ty: () => Pieces.random(-200, 200),
      translate: () => {
        if (windowWidth > 1120) return { translateX: -340, translateY: -180 };
        if (windowWidth > 720) return { translateX: -240, translateY: -180 };
        return { translateX: -140, translateY: -100 };
      },
    };

    const items: any = [];
    let imagesReady = 0;
    function showItems() {
      piecesSlider.showPieces({
        items: currentImageIndex,
        ignore: ['tx'],
        singly: true,
        update: (anim : any) => {
          if (anim.progress > 60) {
            const piece = anim.animatables[0].target;
            const { ty } = piece;
            anime.remove(piece);
            anime({
              targets: piece,
              ty: piece.h_ty < 300
                ? [{ value: ty + 10, duration: 1000 }, { value: ty - 10, duration: 2000 }, { value: ty, duration: 1000 }]
                : [{ value: ty - 10, duration: 1000 }, { value: ty + 10, duration: 2000 }, { value: ty, duration: 1000 }],
              duration: 2000,
              easing: 'linear',
              loop: true,
            });
          }
        },
      });
      piecesSlider.showPieces({ items: currentTextIndex });
      piecesSlider.showPieces({ items: currentNumberIndex, ty: ((p:any, i: any) => p.s_ty - [-3, 3][i % 2]) });
    }
    function initSlider() {
      if (piecesSlider) piecesSlider.stop();
      piecesSlider = new Pieces({
        canvas: canvasRef.current,
        items,
        x: 'centerAll',
        y: 'centerAll',
        piecesSpacing: 1,
        fontFamily: ['Helvetica Neue', 'sans-serif'],
        animation: {
          duration: () => Pieces.random(1000, 2000),
          easing: 'easeOutQuint',
        },
      });
      piecesSlider.animateItems({
        items: numberIndexes,
        duration: 2000,
        angle: 360,
        loop: true,
      });
      showItems();
    }
    function hideItems() {
      piecesSlider.hidePieces({ items: [currentImageIndex, currentTextIndex, currentNumberIndex] });
    }
    function prevItem() {
      hideItems();
      currentIndex = currentIndex > 0 ? currentIndex - 1 : slidersLength - 1;
      updateIndexes();
      showItems();
    }
    function nextItem() {
      hideItems();
      currentIndex = currentIndex < slidersLength - 1 ? currentIndex + 1 : 0;
      updateIndexes();
      showItems();
    }
    let initial = true;
    let hideTimer : any;
    let resizeTimer : any;
    function resizeEnd() {
      initial = true;
      windowWidth = window.innerWidth;
      initSlider();
      hideTimer = setTimeout(() => {
        canvasRef.current!.classList.remove('pieces_slider_canvas_hidden');
      }, 500);
    }
    function resizeStart() {
      if (initial) {
        initial = false;
        if (hideTimer) clearTimeout(hideTimer);
        canvasRef.current!.classList.add('pieces_slider_canvas_hidden');
      }
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeEnd, 200);
    }
    function initEvents() {
      prevRef.current!.addEventListener('click', prevItem);
      nextRef.current!.addEventListener('click', nextItem);
      window.addEventListener('resize', resizeStart);
    }
    for (let i = 0; i < slidersLength; i++) {
      const sliderImage = new Image();
      // eslint-disable-next-line no-loop-func
      sliderImage.onload = () => {
        if (++imagesReady === slidersLength) {
          initSlider();
          initEvents();
        }
      };
      items.push({ type: 'image', value: imageRef.current[i], options: ImageOptions });
      items.push({ type: 'text', value: sliderItems[i].text, options: textOptions });
      items.push({ type: 'text', value: i + 1, options: numberOptions });
      textIndexes.push(i * 3 + 1);
      numberIndexes.push(i * 3 + 2);
      sliderImage.src = imageRef.current[i].src;
    }
    return () => {
      window.removeEventListener('resize', resizeStart);
    };
  });
  return (
    <SliderWrapper>
      <div ref={prevRef} className="absolute left-0 top-2/4 flex justify-center items-center w-16 h-16 bg-blue-600 hover:bg-blue-700 cursor-pointer z-30">
        prev
      </div>
      <div ref={nextRef} className="absolute right-0 top-2/4 flex justify-center items-center w-16 h-16 bg-blue-600 hover:bg-blue-700 cursor-pointer z-30">
        next
      </div>
      <canvas ref={canvasRef} className="pieces_slider_canvas" />
      <div className="pieces_slider">
        {
          sliderItems.map((item) => (
            <img
              ref={(img : HTMLImageElement) => imageRef.current.push(img)}
              className="pieces_image"
              src={item.src}
              alt=""
              key={item.src}
            />
          ))
        }
      </div>
    </SliderWrapper>
  );
});

export default page;
