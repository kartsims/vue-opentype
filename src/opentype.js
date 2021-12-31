
import opentype from 'opentype.js'

opentype.Path.prototype.rotate = function (deg) {
  const a = deg / 180 * Math.PI
  const m = [
    Math.cos(a), Math.sin(a), -Math.sin(a),
    Math.cos(a), 0, 0,
  ]
  this.applyMatrix(m)
}

opentype.Path.prototype.move = function (x, y = 0) {
  const m = [
    1, 0, 0,
    1, x, y,
  ]
  this.applyMatrix(m)
}

opentype.Path.prototype.scale = function (x, y) {
  y = y || x
  const m = [
    x, 0, 0,
    y, 0, 0,
  ]
  this.applyMatrix(m)
}

opentype.Path.prototype.applyMatrix = function (m) {
  function pointApplyMatrix(x, y) {
    return {
      x: m[0] * x + m[2] * y + m[4],
      y: m[1] * x + m[3] * y + m[5],
    }
  }

  this.commands.forEach((cmd) => {
    const { x, y } = pointApplyMatrix(cmd.x, cmd.y)
    cmd.x = x
    cmd.y = y
    if (cmd.x1) {
      const { x, y } = pointApplyMatrix(cmd.x1, cmd.y1)
      cmd.x1 = x
      cmd.y1 = y
    }
    if (cmd.x2) {
      const { x, y } = pointApplyMatrix(cmd.x2, cmd.y2)
      cmd.x2 = x
      cmd.y2 = y
    }
  });
}
