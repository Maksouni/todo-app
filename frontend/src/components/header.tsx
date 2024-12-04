export default function Header() {
    return (
        <header className="text-primary-50 p-4">
            <div className="container mx-auto flex flex-col justify-center items-center gap-5">
                <h1 className="text-2xl font-bold">todo-app</h1>
                {/* searchbar */}
                <div className="container flex justify-center">
                    <input
                        type="text"
                        id="textInput"
                        placeholder="Поиск"
                        // onChange={}
                        className="border border-surface-200 border-4 rounded-xl rounded-e-none text-neutral-300 text-2xl bg-transparent w-1/2 py-2 px-5 placeholder:text-neutral-600 focus:outline-none
                        focus:border-primary-50 "
                    />
                    <button className="w-20 bg-surface-200 hover:bg-neutral-600 border border-surface-200 hover:border-neutral-600 border-4 
                    rounded-xl rounded-s-none flex justify-center items-center border-s-0
                    ">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M33 33L30 30M31.5 17.25C31.5 25.1201 25.1201 31.5 17.25 31.5C9.37994 31.5 3 25.1201 3 17.25C3 9.37994 9.37994 3 17.25 3C25.1201 3 31.5 9.37994 31.5 17.25Z" stroke="#B9B9B9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}