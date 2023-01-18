import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringToNumPipe implements PipeTransform {
  transform(value: string): number {
    return Number(value) as number;
  }
}
