(function() {
    // ambil elemen canvas dan cek apakah webGL nya hidup
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var program,program2;

    glUtils.SL.init({ callback:function() { main(); } });

    function main() {
        // Register Callbacks
        window.addEventListener('resize', resizer);

        // Get canvas element and check if WebGL enabled
        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);
    
        // Initialize the shaders and program
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
        var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
        var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    
        //untuk cube
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        var thetaLoc_Cube = gl.getUniformLocation(program, 'theta');
        var thetaCube;

        //untuk huruf
        program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
        var thetaLoc = gl.getUniformLocation(program2, 'theta'); 
        var transLoc = gl.getUniformLocation(program2, 'trans');
        var thetaC = [0, 58, 0];
        var trans = [0, 0, 0]; // vector translasi
        var X = 0.0093, Y = 0.0094,Z = 0.0145;

        function render(){
          gl.clearColor(0, 0, 0, 1);
          gl.colorMask(true,true,true,true);
          gl.clear(gl.COLOR_BUFFER_BIT);
  
          gl.useProgram(program);
          thetaCube = [10, 10, 0];
          gl.uniform3fv(thetaLoc_Cube, thetaCube);
          drawcube();
          gl.drawArrays(gl.LINES,0,24);

          gl.useProgram(program2);
          drawtriangle();
          gl.drawArrays(gl.TRIANGLE_STRIP,0,20);

          requestAnimationFrame(render);
        }

        function drawcube(){
            var cubeVertices = [
                -0.4,  -0.7,  0.5,      1.0, 0.0, 1.0,          //A
                0.2,  -0.7,  0.5,       1.0, 0.0, 1.0,          //B
                0.2,  -0.7,  0.5,       0.0, 0.0, 1.0,          //B
                0.2,  -0.7,  -0.7,      0.0, 0.0, 1.0,          //C
                0.2,  -0.7,  -0.7,      0.0, 0.0, 1.0,          //C
                -0.4,  -0.7,  -0.7,     0.0, 0.0, 1.0,          //D
                -0.4,  -0.7,  -0.7,     0.0, 0.0, 1.0,          //D
                -0.4,  -0.7,  0.5,      1.0, 0.0, 1.0,          //A
                -0.4,  0.55,  0.5,       1.0, 0.0, 1.0,          //E
                0.2,  0.55,  0.5,        1.0, 0.0, 1.0,          //F
                0.2,  0.55,  0.5,        0.0, 0.0, 1.0,          //F
                0.2,  0.55,  -0.7,       0.0, 0.0, 1.0,          //G
                0.2,  0.55,  -0.7,       0.0, 0.0, 1.0,          //G
                -0.4,  0.55,  -0.7,      0.0, 0.0, 1.0,          //H
                -0.4,  0.55,  -0.7,      0.0, 0.0, 1.0,          //H
                -0.4,  0.55,  0.5,       1.0, 0.0, 1.0,          //E
                -0.4,  -0.7,  0.5,      1.0, 0.0, 1.0,          //A
                -0.4,  0.55,  0.5,       1.0, 0.0, 1.0,          //E
                0.2,  -0.7,  0.5,       1.0, 0.0, 1.0,          //B
                0.2,  0.55,  0.5,        0.0, 0.0, 1.0,          //F
                0.2,  -0.7,  -0.7,      0.0, 0.0, 1.0,          //C
                0.2,  0.55,  -0.7,       0.0, 0.0, 1.0,          //G
                -0.4,  -0.7,  -0.7,     0.0, 0.0, 1.0,          //D
                -0.4,  0.55,  -0.7,      0.0, 0.0, 1.0           //H  
          ];

          var cubeVertexBufferObject = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

          var vPosition = gl.getAttribLocation(program,'vPosition');
          var vColor = gl.getAttribLocation(program,'vColor');
          gl.vertexAttribPointer(
            vPosition,                          // variable yang memegang posisi atrbute di shader
            3,                                  // jumlah elemen per attribute
            gl.FLOAT,                           // tipe data attribut
            gl.FALSE,                           // default
            6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
            0                                   // offset dari posisi elemen di array
          );
          gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

          gl.enableVertexAttribArray(vPosition);
          gl.enableVertexAttribArray(vColor);
        }

        function drawtriangle(){
          var triangleVertices = [
            +0.7, -0.2,    1.0, 1.0, 0.0,
            +0.6, -0.2,   0.1, 1.0, 0.6,
            +0.7, -0.4,   0.1, 1.0, 0.6,
            +0.6, -0.3,   1.0, 1.0, 0.0,
            +0.6, -0.6,    0.7, 0.0, 1.0,
            +0.55, -0.4,   0.7, 0.0, 1.0,
            +0.3, -0.6,   1.0, 1.0, 0.0,
            +0.35, -0.4,   0.7, 0.0, 1.0,
            +0.2, -0.4,   0.1, 1.0, 0.6,
            +0.3, -0.3,    0.7, 0.0, 1.0,
            +0.2, +0.4,   1.0, 1.0, 0.0,
            +0.3, +0.3,   0.7, 0.0, 1.0,
            +0.3, +0.6,   0.7, 0.0, 1.0,
            +0.35, +0.4,   0.1, 1.0, 0.6,
            +0.6, +0.6,    0.7, 0.0, 1.0,
            +0.55, +0.4,   1.0, 1.0, 0.0,
            +0.7, +0.4,   0.7, 0.0, 1.0,
            +0.6, +0.3,   0.7, 0.0, 1.0,
            +0.7, +0.2,   0.1, 1.0, 0.6,
            +0.6, +0.2,    1.0, 1.0, 0.0
          ];
          var triangleVertexBufferObject = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

          var vPosition = gl.getAttribLocation(program2,'vPosition');
          var vColor = gl.getAttribLocation(program2,'vColor');
          gl.vertexAttribPointer(
            vPosition,                          // variable yang memegang posisi atrbute di shader
            2,                                  // jumlah elemen per attribute
            gl.FLOAT,                           // tipe data attribut
            gl.FALSE,                           // default
            5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
            0                                   // offset dari posisi elemen di array
          );
          gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

            //memantul
            if(trans[0] >= 0.2*0.7 || trans[0] <= -0.4*0.7 ){
                X *= -1;
              }
              trans[0] += X;
        
              if(trans[1] >= 0.55*0.7 || trans[1] <= -0.7*0.7 ){
                Y *= -1;
              }
              trans[1] += Y;
        
              if(trans[2] >= 0.5*0.7 || trans[2] <= -0.7*0.7){
                Z *= -1;
              }
              trans[2] += Z;
        
              gl.uniform3fv(transLoc, trans);

            //speed rotasi Y
            thetaC[1] += 0.58;
            gl.uniform3fv(thetaLoc, thetaC);

            gl.enableVertexAttribArray(vPosition);
          gl.enableVertexAttribArray(vColor);
            
        }
        resizer();
        render();
    }
      function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
    
    })(window || this);
    