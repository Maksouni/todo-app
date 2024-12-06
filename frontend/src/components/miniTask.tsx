

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
            {/* <input
                type="checkbox"
                className="w-12 h-12 bg-transparent border-gray-300"
            /> */}
            {/* <div className="flex items-center me-4">
                <input
                    id="purple-checkbox"
                    type="checkbox"
                    value=""
                    className="peer hidden "
                />
                <label
                    htmlFor="purple-checkbox"
                    className="w-12 h-12 text-secondary 
                        bg-transparent border-surface-300 border-2 rounded-2xl 
                        focus:ring-purple-500 focus:ring-0 
                        focus:bg-secondary cursor-pointer"
                >
                    1
                </label>
            </div> */}
            <div className="flex items-center">
                <input id="checkbox" type="checkbox" className="peer hidden" />
                <label
                    htmlFor="checkbox"
                    className="px-3 py-2 bg-transparent text-white text-center
                        border border-surface-300 border-2 rounded-3xl cursor-pointer 
                        peer-checked:bg-secondary peer-checked:border-secondary peer-checked:scale-105 peer-checked:text-black
                        transition-all duration-300 ease-in-out"
                >
                    Click me
                </label>
            </div>

        </div>
    )
}