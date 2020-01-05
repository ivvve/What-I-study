import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {TaskStatus} from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly statuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ];

  transform(value: any, metadata: ArgumentMetadata): any {
    const status = value.status.toUpperCase();

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
