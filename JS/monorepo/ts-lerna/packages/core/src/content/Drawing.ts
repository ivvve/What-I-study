import { StringUtils } from '@devson/common';

export class Drawing {
  private id: string;
  private painterId: string;
  private imageUrl: string;
  private title: string;

  constructor(id: string, painterId: string, imageUrl: string, title: string) {
    if (StringUtils.isBlank(id)) {
      throw new Error('ID is blank');
    }

    this.id = id;
    this.painterId = painterId;
    this.imageUrl = imageUrl;
    this.title = title;
  }

  toJson() {
    return Object.assign({}, this);
  }
}
