import React, { useState } from 'react'

const Stop = () => {
  const [time, setTime] = useState<number>(0)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const [laps, setLaps] = useState<number[]>([]) // ラップタイムを保存するステート変数

  // Startボタンを押した時の処理
  const handleStart = () => {
    if (timerId) return // 二重ボタン押下防止
    // 10ミリ秒ごとにtimeの変数を上書き
    const id: NodeJS.Timeout = setInterval(() => setTime((prevTime) => prevTime + 10), 10)
    setTimerId(id)
  }

  // Stopボタンを押した時の処理
  const handleStop = () => {
    // 一定間隔ごとに実行する処理を解除
    if (timerId) clearInterval(timerId)
    setTimerId(null)
  }

  // Lapボタンを押した時の処理
  const handlelap = () => {
    // 現在のタイムをラップタイムとして保存
    setLaps((prevLaps) => [...prevLaps, time])
  }

  // Resetボタンを押した時の処理
  const handleReset = () => {
    setTime(0)
    setLaps([])
    if (timerId) clearInterval(timerId)
    setTimerId(null)
  }

  return (
    <div>
      <div>{(time / 1000).toFixed(2)} s</div>
      <div>
        <button onClick={handleStart}>Start</button>
      </div>
      <div>
        <button onClick={handleStop}>Stop</button>
      </div>
      <div>
        <button onClick={handlelap}>lap</button>
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <h3>Lap Times</h3>
        <ul>
          {laps.map((lapTime, index) => (
            <li key={index}>{(lapTime / 1000).toFixed(2)} s</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Stop
