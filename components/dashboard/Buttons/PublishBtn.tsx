
interface PublishBtnProps {
    text: string;
  form?: string;
  onClick?: () => void;
}

function PublishBtn({text, form, onClick }: PublishBtnProps) {
    return (
        <button
        onClick={onClick}
        form={form}
        type="submit"
        className="px-4 w-42 py-3 bg-(--primary) hover:bg-(--tertiary) transition-colors text-white rounded-lg shadow-md col-start-1 cursor-pointer"
        >
            {text}
        </button>
    )
}

export default PublishBtn
