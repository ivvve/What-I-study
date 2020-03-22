import { Drawing } from '@devson/core/content'

export class DrawingController {
  drawingTest() {
    const drawing = new Drawing("1", "1", "1", "1");
    console.log(drawing.toJson());
  }
}

const drawing = new Drawing("1", "1", "1", "1");
console.log(drawing.toJson());
