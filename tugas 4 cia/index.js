(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    //box
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    //huruf
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);

    var theta = [0.0, 0.0, 0.0];
    //var axis = 0;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;

    //mouse control
    var lastX, lastY, dragging;
    function onMouseDown(event) {
      var x = event.clientX;
      var y = event.clientY;
      var rect = event.target.getBoundingClientRect();
      if (rect.left <= x &&
          rect.right > x &&
          rect.top <= y &&
          rect.bottom > y) {
            lastX = x;
            lastY = y;
            dragging = true;
      }
    }
    function onMouseUp(event) {
      dragging = false;
    }
    function onMouseMove(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (dragging) {
        var factor = 10 / canvas.height;
        var dx = factor * (x - lastX);
        var dy = factor * (y - lastY);
        theta[yAxis] += dx;
        theta[xAxis] += dy;
      }
      lastX = x;
      lastY = y;
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    gl.useProgram(program);

    //huruf
    var triangleVertices = [
      //x,y
      0.7, -0.2, 0.0,    
      0.6, -0.2, 0.0,   
      0.7, -0.4,0.0,    
      0.6, -0.3,0.0,    
      0.6, -0.6,0.0,    
      0.55, -0.4,0.0,   
      0.3, -0.6,0.0,    
      0.35, -0.4,0.0,   
      0.2, -0.4,0.0,    
      0.3, -0.3,0.0,   
      0.2, 0.4, 0.0,   
      0.3, 0.3, 0.0,   
      0.3, 0.6, 0.0,   
      0.35, 0.4, 0.0,  
      0.6, 0.6, 0.0,   
      0.55, 0.4, 0.0,  
      0.7, 0.4, 0.0,   
      0.6, 0.3, 0.0,   
      0.7, 0.2, 0.0,   
      0.6, 0.2, 0.0
    ];
    matrixScaling(triangleVertices, 0.3);

    function drawTriangles(){
      TriangleBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER ,TriangleBuffer);
      gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(triangleVertices), gl.STATIC_DRAW);
      var aPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');
      gl.vertexAttribPointer(
        aPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        0,
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(aPosition);
      gl.enableVertexAttribArray(vColor);
      gl.useProgram(program);
    }

    var cubeVertices = [
      // x, y, z            u, v         normal
      0.5,  0.5,  0.5,     0.33, 0.5,  1.0, 0.0, 0.0, // kanan, hijau, CDH CHG
      0.5, -0.5,  0.5,     0.33, 0.0,  1.0, 0.0, 0.0,
      0.5, -0.5, -0.5,     0.67, 0.0,  1.0, 0.0, 0.0,
      0.5,  0.5,  0.5,     0.33, 0.5,  1.0, 0.0, 0.0,
      0.5, -0.5, -0.5,     0.67, 0.0,  1.0, 0.0, 0.0,
      0.5,  0.5, -0.5,     0.67, 0.5,  1.0, 0.0, 0.0,

      0.5, -0.5,  0.5,     0.0, 1.0,  0.0, -1.0, 0.0, // bawah, biru, DAE DEH
     -0.5, -0.5,  0.5,     0.0, 0.5,  0.0, -1.0, 0.0,
     -0.5, -0.5, -0.5,     0.33, 0.5,  0.0, -1.0, 0.0,
      0.5, -0.5,  0.5,     0.0, 1.0,  0.0, -1.0, 0.0,
     -0.5, -0.5, -0.5,     0.33, 0.5,  0.0, -1.0, 0.0,
      0.5, -0.5, -0.5,     0.33, 1.0,  0.0, -1.0, 0.0,

     -0.5, -0.5, -0.5,     0.33, 1.0,  0.0, 0.0, -1.0, // belakang, kuning, EFG EGH
     -0.5,  0.5, -0.5,     0.33, 0.5,  0.0, 0.0, -1.0,
      0.5,  0.5, -0.5,     0.67, 0.5,  0.0, 0.0, -1.0,
     -0.5, -0.5, -0.5,     0.33, 1.0,  0.0, 0.0, -1.0,
      0.5,  0.5, -0.5,     0.67, 0.5,  0.0, 0.0, -1.0,
      0.5, -0.5, -0.5,     0.67, 1.0,  0.0, 0.0, -1.0,

     -0.5,  0.5, -0.5,     0.67, 1.0,  -1.0, 0.0, 0.0, // kiri, cyan, FEA FAB
     -0.5, -0.5, -0.5,     0.67, 0.5,  -1.0, 0.0, 0.0,
     -0.5, -0.5,  0.5,     1.0, 0.5,  -1.0, 0.0, 0.0,
     -0.5,  0.5, -0.5,     0.67, 1.0,  -1.0, 0.0, 0.0,
     -0.5, -0.5,  0.5,     1.0, 0.5,  -1.0, 0.0, 0.0,
     -0.5,  0.5,  0.5,     1.0, 1.0,  -1.0, 0.0, 0.0,

      0.5,  0.5, -0.5,     0.0, 0.5,  0.0, 1.0, 0.0, // atas, magenta, GFB GBC
     -0.5,  0.5, -0.5,     0.0, 0.0,  0.0, 1.0, 0.0,
     -0.5,  0.5,  0.5,     0.33, 0.0,  0.0, 1.0, 0.0,
      0.5,  0.5, -0.5,     0.0, 0.5,  0.0, 1.0, 0.0,
     -0.5,  0.5,  0.5,     0.33, 0.0,  0.0, 1.0, 0.0,
      0.5,  0.5,  0.5,     0.33, 0.5,  0.0, 1.0, 0.0
    ];

    var vPosition;
    var vTexCoord;
    var vNormal;
    var center = [0,0,0];
    var tag = 1;

    function drawCube(){
      var cubeVBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
      vPosition = gl.getAttribLocation(program, 'vPosition');
      vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
      vNormal = gl.getAttribLocation(program, 'vNormal');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vTexCoord);
      gl.enableVertexAttribArray(vNormal);
      gl.useProgram(program);
    }

    // Uniform untuk definisi cahaya
    var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
    var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
    var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
    var lightColor = [0.5, 0.5, 0.5];
    var ambientColor = glMatrix.vec3.fromValues(0.17, 0.41, 0.58);
    gl.uniform3fv(lightColorLoc, lightColor);
    gl.uniform3fv(ambientColorLoc, ambientColor);
    var nmLoc = gl.getUniformLocation(program, 'normalMatrix');
    
    // Definisi view, model, dan projection
    var vmLoc = gl.getUniformLocation(program, 'view');
    var pmLoc = gl.getUniformLocation(program, 'projection');
    var mmLoc = gl.getUniformLocation(program, 'model');
    var vm = glMatrix.mat4.create();
    var pm = glMatrix.mat4.create();

    glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, 0.0),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(
      pm,
      fovy,
      aspect,
      near,
      far
    );

    gl.uniformMatrix4fv(vmLoc, false, vm);
    gl.uniformMatrix4fv(pmLoc, false, pm);
  
    var vmLoc2 = gl.getUniformLocation(program2, 'view');
    var pmLoc2 = gl.getUniformLocation(program2, 'projection');
    gl.uniformMatrix4fv(vmLoc2, false, vm);
    gl.uniformMatrix4fv(pmLoc2, false, pm);
    var lightPosition = [triangleVertices[24], triangleVertices[25], triangleVertices[26]];

    function render() {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
      drawCube();
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vTexCoord);
      gl.enableVertexAttribArray(vNormal);
      gl.drawArrays(gl.TRIANGLES, 0, 30);
      drawTriangles();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 20);

     // theta[axis] += glMatrix.glMatrix.toRadian(0.5);  // dalam derajat
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
      // glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);

      var mvpLoc = gl.getUniformLocation(program, 'MVPMatrix');
      var mvp = glMatrix.mat4.create();
      glMatrix.mat4.multiply(mvp,vm,mm);
      glMatrix.mat4.multiply(mvp,pm,mvp);

      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, 2.0]);
      glMatrix.mat4.rotateY(mvp, mvp, theta[yAxis]);
      glMatrix.mat4.rotateX(mvp, mvp, theta[xAxis]);

      gl.uniformMatrix4fv(mvpLoc, false, mvp);
      gl.uniformMatrix4fv(mmLoc, false, mm);
      
      gl.uniform3fv(lightPositionLoc, lightPosition);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);
      bergerak();

      requestAnimationFrame(render); 
    }
    
    var batasbox = [0, 15, 18, 21, 33, 45];
    var trans = [0.0,0.0,0.0];
    trans[0] -= 0.5;
    trans[1] -= 0.3;
    trans[2] -= 0.4;
    
    function mantul() {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 6; j++) {
          if (triangleVertices[batasbox[j] + i] >= 0.45 || triangleVertices[batasbox[j] + i] <= -0.45) {
            trans[i] *= -1;
            tag *= -1;
            break;
          }
        }
      }
    }
    
    function bergerak(){
      //pergerakannya
      triangleVertices = matrixTranslating(triangleVertices , trans[0] * 0.01, trans[1] * 0.01, trans[2] * 0.01);
      lightPosition = matrixTranslating(lightPosition, trans[0] * 0.01, trans[1] * 0.01, trans[2] * -0.01);
      center[0] += (trans[0] * 0.01);
      center[1] += (trans[1] * 0.01);
      center[2] += (trans[2] * 0.01);
      triangleVertices = matrixRotating(triangleVertices, tag * 1.5, center[0], center[2])
      
      mantul();
    }

    //texture selfie
    var texture = gl.createTexture();
    if (!texture) {
      reject(new Error('Gagal membuat objek tekstur'));
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Sementara warnai tekstur dengan sebuah 1x1 piksel biru
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    initTexture(function () {
      render();
    });

    // Membuat mekanisme pembacaan gambar jadi tekstur
    function initTexture(callback, args) {
      var imageSource = 'images/page1.jpg';
      var promise = new Promise(function(resolve, reject) {
        var image = new Image();
        if (!image) {
          reject(new Error('Gagal membuat objek gambar'));
        }
        image.onload = function() {
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          resolve('Sukses');
        }
        image.src = imageSource;
      });
      promise.then(function() {
        if (callback) {
          callback(args);
        }
      }, function (error) {
        console.log('Galat pemuatan gambar', error);
      });
    }

    //resizer();
    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

  }

})();
