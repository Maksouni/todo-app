export default function MiniTask() {
    return (
        <div className="container mt-10 max-w-7xl mx-auto py-10 px-10 bg-surface-200 rounded-3xl 
        flex items-center justify-between">
            <div className="container flex flex-col gap-3 font-roboto-mono">
                <h2 className="text-2xl text-primary-50 font-bold">
                    Task title 1
                </h2>
                <p className="text-xl text-onSurface">
                    Task description lorem ipsum dolot azaza test text lorem ipsum
                </p>
            </div>
            <div className="">
                <input
                    type="checkbox"
                    className="w-12 h-12 bg-transparent border-gray-300"
                />

            </div>
        </div>
    )
}