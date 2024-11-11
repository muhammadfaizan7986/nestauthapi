import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
interface ResponseFormat<T> {
    statusCode: number;
    message: string;
    data: T;
}
export declare class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
    private reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>>;
}
export {};
