import {useEffect} from "react";

type ValidKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
    | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
    | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
    | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12'
    | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
    | 'Tab' | 'Shift' | 'Control' | 'Alt' | 'CapsLock' | 'Space' | 'Enter' | 'Backspace' | 'Delete';

export function useCtrlKeyShortcut(key: ValidKey, keypressEvent: () => void) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === key && event.ctrlKey) {
                keypressEvent()
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
}
