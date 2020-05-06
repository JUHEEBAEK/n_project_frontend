<template>
    <div>
        <h1> Fabric Example</h1>
        <div id="canvasWrapper"
            tabIndex="1"
            @keyup.8="deleteSelected()" 
            @keyup.27="deleteSelected()"
            @keyup.46="deleteSelected()"
        >
            <canvas id="canvas" ref="can" width="1500" height="1200" 
            ></canvas>
        </div>
        
        <v-btn @click="newRect"> Can Draw Rect</v-btn>
        <v-btn @click="saveAndErase()"> Save & Erase </v-btn>
        <v-btn @click="load()"> Load </v-btn>
        <v-btn @click="makeImage()"> CreateImage </v-btn>
        <v-btn @click="deleteSelected()"> Delete </v-btn>
        
    </div>
</template>

<script >
import { fabric } from 'fabric'
export default {

    data() {
        return {
            canvas: null,
            save_data: null,
            isDrawingMode: false,
            xfirstPoint: null,
            yfirstPoint: null,
        }
    },
  mounted() {
    const ref = this.$refs.can;

    this.canvas = new fabric.Canvas(ref);
    let _this = this;
    // 축구공 이미지
    fabric.Image.fromURL('https://cdn.pixabay.com/photo/2013/07/13/10/51/football-157930_1280.png', function(img) {
        _this.canvas.add(img.set({ left: 300, top: 250 }).scale(0.035));
    });

    // 선수이미지1
    fabric.Image.fromURL('https://cdn.pixabay.com/photo/2012/04/14/15/12/soccer-34248_1280.png', function(img) {
        _this.canvas.add(img.set({ left: 350, top: 350 }).scale(0.095));
    });

  },
  methods: {
      focusCanvas(){
        console.log("focusing")
        $('#can').focus();
      },
    newRect(){
        let _this = this
        this.canvas.observe('mouse:down', function(e) { _this.mousedown(e); });
        this.canvas.observe('mouse:move', function(e) { _this.mousemove(e); });
        this.canvas.observe('mouse:up',   function(e) { _this.mouseup(e);   });
    },
    /* Mousedown */
    mousedown(e) {
        
        console.log(e)
        var mouse = this.canvas.getPointer(e.pointer);
        this.isDrawingMode = true;
        this.xfirstPoint = Number(mouse.x);
        this.yfirstPoint = Number(mouse.y);
        console.log("down", mouse)

        var square = new fabric.Rect({ 
            width: 0, 
            height: 0, 
            left: this.xfirstPoint, 
            top: this.yfirstPoint, 
            fill: '#000'
        });

        this.canvas.add(square); 
        this.canvas.renderAll();
        this.canvas.setActiveObject(square); // focus 해주는 기능인듯

    },

        /* Mousemove */
    mousemove(e) {
        if(!this.isDrawingMode) {
            return false;
        }

        var mouse = this.canvas.getPointer(e.pointer);

        var w = Math.abs(mouse.x - this.xfirstPoint),
        h = Math.abs(mouse.y - this.yfirstPoint);

        if (!w || !h) {
            return false;
        }

        var square = this.canvas.getActiveObject(); 
        square.set('width', w).set('height', h);
        this.canvas.renderAll(); 
        this.canvas.setActiveObject(square); // focus 해주는 기능인듯
    },

    /* Mouseup */
    mouseup(e) {
        
        if(this.isDrawingMode) {
            this.isDrawingMode = false;
            this.RemoveEvent()    
        }
        var square = this.canvas.getActiveObject();
        this.canvas.remove(square); // 이렇게 해줘야 잘 선택된다
        this.canvas.add(square); 
        this.canvas.renderAll();
        this.canvas.setActiveObject(square);
    }, 
    RemoveEvent(){
        this.canvas.off('mouse:down');
        this.canvas.off('mouse:move');
        this.canvas.off('mouse:up');
    },
        
    saveAndErase(){
        this.save_data = JSON.stringify(this.canvas.toDatalessJSON())
        this.canvas.remove(...this.canvas.getObjects());
    },
    load(){
        let _this = this
        this.canvas.loadFromJSON(JSON.parse(this.save_data), function() {
                _this.canvas.renderAll(); 
            },function(o,object){
                console.log(o,object)
            })
    },
    makeImage(){
        let _this = this
        fabric.Image.fromURL('https://lh3.googleusercontent.com/proxy/0y10JkA9zBkgAJ5gxSceVjft6yyV-soZE67Xzk6uuJMR6T8tfpvKG3xnFZ5CLP5hSBWoZTuywKVOUQpceA1VVWFGHJhGARG3UTJIsClKs2h6',function(img) {
            _this.canvas.add(img).setActiveObject(img);
        })
        fabric.Image.fromURL('https://i.pinimg.com/originals/96/a9/b7/96a9b78792d5738596fe6c81790fcd4d.jpg',function(img) {
            _this.canvas.add(img).setActiveObject(img);
        })
        fabric.Image.fromURL('https://pngimg.com/uploads/dog/dog_PNG50348.png',function(img) {
            _this.canvas.add(img).setActiveObject(img);
        })
    },
    deleteSelected(){
        console.log('delete called')
        var activeObject = this.canvas.getActiveObject()
        
        if (activeObject) {
            if (confirm('Are you sure?')) {
                this.canvas.remove(activeObject);
            }
        }
    }
    
  },
    

};

</script> 

<style scoped>
    #canvas {
        background-image: url( "https://cdn.pixabay.com/photo/2016/06/01/11/39/football-field-1428839_1280.png" );
        background-size: cover;
    }
    #drawBtn {
        width: 200px;
        line-height: 30px;
        background-color: #222222;
        text-align: center;
        color:#ffffff;
        font-weight: bold;
        list-style: none;
    }
</style>