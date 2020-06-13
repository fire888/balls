import { TweenMax, TimelineLite, Power2, Elastic, CSSPlugin } from "gsap/all";


const addScenario = appData => {


    // DEBUG SLIDER //////////////////////

    function updateSlider(){
        $("#myRange").val (tLine.progress() *100);
    }
        
    $("#myRange").on("input change",(e)=>{
        console.log('onSlide')
        tLine.pause()
        tLine.progress(event.target.value/100)
    });

    $("#play_btn").click(function() {
        if (tLine.progress() == 1) {
            tLine.restart();
        } else {
            tLine.play(); 
        }
    }) 

    //////////////////////////////////////

    window.scrollTo(0, 0)


    console.log(appData)

    const { ball, asterGroup, asterMeshes, timeMesh } = appData.items
    const { cameraText } = appData.studio

    cameraText.position.y = 100
    asterGroup.visible = true
    timeMesh.visible = true


    const astPositions = asterMeshes.map(item => item.position)

    $( window ).scroll(function() {
        tLine.play()
    });

    const tLine = new TimelineLite({ repeat: 5, repeatDelay: 1, onUpdate:updateSlider, paused: true })
        .set(timeMesh.position, { y: -420 })
        .addPause()
        .to(cameraText.position, 1, { y: 3, ease: "easeIn" })
        .add('playAsteroid')
        .to(asterGroup.rotation, 2, { y: 3 }, 'playAsteroid')
        .to(ball, { visible: true })
        .to(astPositions, {
            y: 15, 
            stagger: 0.03, 
            duration: 0.3, 
            ease: "back" 
        })
        .addPause()
        .add('playBall')
        .to(cameraText.position, 2, { y: -417 }, 'playBall')
        .to(ball.position, 2, { y: -420 }, 'playBall')
        .addPause()

        
} 




export const initScenario = appData => {
    addScenario(appData)
    return new Promise(resolve => {
        resolve(appData)
    })
} 