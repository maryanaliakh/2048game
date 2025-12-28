import GameBoard from "./game/GameBoard"

export default function App() {
    return (
        <main className="app">
            <h1>2048</h1>
            <div>
                <GameBoard />
            </div>
        </main>
    )
}