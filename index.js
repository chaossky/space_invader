//캔바스 설정
const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d');
//캔바스 너비와 높이 설정
canvas.width=innerWidth;
canvas.height=innerHeight;

//플레이어 설정
class Player{
    //플레이어 생성자 
    constructor(){    
        // 플레이어 속도 설정            
        this.velocity={
            x:0,
            y:0
        }
        //이미지 설정
        const image=new Image();
        image.src='./img/spaceship.png';

        image.onload=()=>{
            const scale=0.15;//이미지 크기 조절
            this.image=image;//이미지 저장
            this.width=image.width *scale;//이미지 크기 조절
            this.height=image.height*scale;//이미지 크기 조절
          
            // 플레이이어 위치 설정
            this.position=
            {
                x:canvas.width/2-this.width/2, //x 좌표는 절반 가운데
                y:canvas.height-this.height-20 //y 밑에서 20은 바닥에서 떨어지는 거리
            }
        }
    }

    //플레이어 그리기 메소드
    draw(){            
         c.drawImage //이미지 그리기
            (
                    this.image,//이미지
                    this.position.x,//이미지 x 좌표
                    this.position.y,//이미지 y 좌표
                    this.width, //이미지 너비
                    this.height //이미지 높이
                )
        }
    
    //이미지를 뿌려주고 계속 업데이트
    update(){
        if(this.image)//이미지가 있을 때만 업데이트
        {
        this.draw() //이미지 그리기
           //이미지 좌표 업데이트
           this.position.x+=this.velocity.x;
           this.position.y+=this.velocity.y;
        }
    }
}



//프로젝타일 클래스(미사일 )만들기
class Projectile{
    //생성자    
    constructor({position,velocity}){
        this.position=position;
        this.velocity=velocity;

        this.radius=3

    }
//그리기 메소드
    draw(){
        c.beginPath();
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false);
        c.fillStyle='red';
        c.fill();
        c.closePath();
    }
//업데이트 메소드
    update(){
        this.draw();
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
    }
}

class Invader{
    //인베이더 생성자 
    constructor(){    
        // 인베이더 속도 설정            
        this.velocity={
            x:0,
            y:0
        }
        //이미지 설정
        const image=new Image();
        image.src='./img/invader.png';

        image.onload=()=>{
            const scale=1;//이미지 크기 조절
            this.image=image;//이미지 저장
            this.width=image.width *scale;//이미지 크기 조절
            this.height=image.height*scale;//이미지 크기 조절
          
            // 플레이이어 위치 설정
            this.position=
            {
                x:canvas.width/2-this.width/2, //x 좌표는 절반 가운데
                y:canvas.height/2 //y 밑에서 20은 바닥에서 떨어지는 거리
            }
        }
    }

    //플레이어 그리기 메소드
    draw(){            
         c.drawImage //이미지 그리기
            (
                    this.image,//이미지
                    this.position.x,//이미지 x 좌표
                    this.position.y,//이미지 y 좌표
                    this.width, //이미지 너비
                    this.height //이미지 높이
                )
        }
    
    //이미지를 뿌려주고 계속 업데이트
    update(){
        if(this.image)//이미지가 있을 때만 업데이트
        {
        this.draw() //이미지 그리기
           //이미지 좌표 업데이트
           this.position.x+=this.velocity.x;
           this.position.y+=this.velocity.y;
        }
    }
}

class Grid{
    constructor(){
        this.position={
            x:0,
            y:0
        }
       this.velocity={
              x:0,
                y:0

    }
    this.invaders=[new Invader()];
}
}

const player=new Player();//새 플레이어를 인스턴스 생성
const projectiles=[];//미사일 배열로 생성
const grids=[new Grid()];


//입력되는 키값이 눌렸는지를 확인하는 변수 목록
const keys={
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    w:{ 
        pressed:false
    },
    s:{ 
        pressed:false
    },
   space:{
         pressed:false
   }
}

// 애니메이트 함수
function animate(){
    requestAnimationFrame(animate); //이미지 업데이트
    c.fillStyle='black'; //바탕색 설정
    c.fillRect(0,0,canvas.width,canvas.height);//캔버스를 채움
   // invader.update();//인베이더 업데이트
    player.update();//플레이어 업데이트
    projectiles.forEach((projectile,index)=>
    {
        if(projectile.position.y+projectile.radius<=0)
        {
            setTimeout(()=>{
                projectiles.splice(index,1);
            },0);
        }
        else
        {
            projectile.update();
        }
    })

    grids.forEach((grid,index)=>{
        //grid.update();
    })
  
    //키보드 입력 처리
    if(keys.ArrowLeft.pressed && player.position.x>=0)
    {
        player.velocity.x=-5;
    }else if (keys.ArrowRight.pressed && player.position.x<=canvas.width-player.width){
        player.velocity.x=5;
    } else if (keys.w.pressed){
        player.velocity.y=-4;
    } else if (keys.s.pressed){
        player.velocity.y=4;
    }else {
        player.velocity.x=0;
        player.velocity.y=0;
    }

}

animate();

//키보드 입력 처리

//키보드를 눌렀을 때
addEventListener('keydown',({key})=>{
    switch(key){
        //case 'a':
        case 'ArrowLeft':
         console.log('left');
            keys.ArrowLeft.pressed=true;
            player.velocity.x=-1;
            break;
        //case 'd':
        case 'ArrowRight':
          console.log('right');
            keys.ArrowRight.pressed=true;
            player.velocity.x=1;
            break;
       // case 'w':
          //  console.log('up');
         //   keys.w.pressed=true;
         //   player.velocity.y=-1;
           // break;
       // case 's':
          //  console.log('down');
         //   keys.s.pressed=true ;
         //   player.velocity.y=1;
         //   break;
        case ' ':
          console.log('space');
          projectiles.push(new Projectile({
            position:{
                x:player.position.x+player.width/2,
                y:player.position.y
            },
            velocity:{
                x:0,
                y:-5
            }
        }));             
            //player.velocity.y=-10;
            break;
    }
})

//키보드를 땠을 때
addEventListener('keyup',({key})=>{
    switch(key){
        //case 'a':
        //console.log('left');
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false;
            player.velocity.x=-1;
            break;
        // case'd':
        case 'ArrowRight':
          //  console.log('right');
            keys.ArrowRight.pressed=false;
            player.velocity.x=1;
            break;
        // case 'w':
        //   //  console.log('up');
        //     keys.w.pressed=false;
        //     player.velocity.y=-1;
        //     break;
        // case 's':
        //   //  console.log('down');
        //     keys.s.pressed=false;
        //     player.velocity.y=1;
        //     break;
        // case ' ':
            //console.log('space');
            //player.velocity.y=-10;
           // break;
    }
})