precision mediump float;

attribute vec3 vPosition;
uniform vec3 theta;
uniform mat4 projection;
uniform mat4 view;
uniform vec3 trans;

void main() {
  mat4 translate = mat4(
      1.0, 0.0, 0.0, trans.x,
      0.0, 1.0, 0.0, trans.y,
      0.0, 0.0, 1.0, trans.z,
      0.0, 0.0, -3.0, 1.0 
  );
  gl_Position = projection * view * translate * vec4(vPosition, 1.0);
}