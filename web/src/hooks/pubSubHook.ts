import { EventEmitter} from 'eventemitter3';
import { useEffect } from 'react';

const emitter = new EventEmitter();

export const useSub = (event: any, callback: any) => {
    
    const unSubscribe = () => {
        emitter.off(event, callback);
    }
    
    useEffect(() => {
        emitter.on(event, callback);
        return unSubscribe;
    }, []);

    return unSubscribe;
}

export const usePub = () => {
    return (event: any, data:any) => {
        emitter.emit(event, data);  
    }
}