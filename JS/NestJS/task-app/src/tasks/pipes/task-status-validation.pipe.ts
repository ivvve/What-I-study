import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {TaskStatus} from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly statuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    console.log('----------------');
    console.log('value');
    console.log(value);
    console.log('metadata');
    console.log(metadata);
    console.log('----------------');

    if (this.statuses.indexOf(value) < 0) {
      return value;
    }

    throw new BadRequestException();
  }
}
