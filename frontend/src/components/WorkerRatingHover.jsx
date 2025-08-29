export default function RatingHover({ rating }) {
    return (
        <dialog className="rounded-md shadow-sm bg-white p-4">
            <span>{rating}</span>
        </dialog>
    )
}