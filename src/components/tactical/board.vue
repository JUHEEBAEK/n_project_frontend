<template>
    <div>
        <h1> Fabric Example</h1>
        <canvas ref="can" width="1000" height="1000"></canvas>
        
        <v-btn @click="newRect"> Can Draw Rect</v-btn>
        <v-btn @click="saveAndErase()"> Save & Erase </v-btn>
        <v-btn @click="load()"> Load </v-btn>
        <v-btn @click="makeImage()"> CreateImage </v-btn>
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
    const rect = new fabric.Rect({
      fill: 'red',
      width: 20,
      height: 20
    });
    this.canvas.add(rect);
    var path = new fabric.Path('M 0 500 L 200 100 L 400 400', {
            'fill': 'transparent',
            'stroke': '#000',
            'stroke-width': '1.5px',
            'strokeDashArray': [10, 10],
    });
    path.set({ left: 120, top: 120 }); 

    this.canvas.add(path);
    
    
    console.log('this.canvas to json')
    console.log(this.canvas.toDatalessJSON(['id']));

    var square = new fabric.Rect({ 
            width: 100, 
            height: 100, 
            left: 100, 
            top: 100, 
            fill: '#000'
        });

    this.canvas.add(square); 
    square.set('width', 200).set('height', 200);

  },
  methods: {
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
        this.save_data = this.canvas.toDatalessJSON()
        this.canvas.remove(...this.canvas.getObjects());
    },
    load(){
        let _this = this
        this.canvas.loadFromJSON(this.save_data, function() {
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
    }
  },
    

};

</script> 