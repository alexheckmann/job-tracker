interface ShortcutHintProps {
    keys: string[]
}

export default function Shortcut({keys}: ShortcutHintProps) {
    return (
        <kbd
            className="hidden pointer-events-none lg:inline-flex h-5 select-none text-[10px] font-sans items-center rounded border px-1.5 font-light opacity-100 gap-2">
            {keys.map((key, index) => (
                <span key={index} className="text-xs">{key}</span>
            ))
            }
        </kbd>
    )
}
