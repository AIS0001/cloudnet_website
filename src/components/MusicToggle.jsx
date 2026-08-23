import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const STORAGE_KEY = 'cn_music_on'

/**
 * MusicToggle
 * Background music with a manual on/off control. On mount it tries to
 * play audibly right away - most browsers only allow that once a visitor
 * has already interacted with audio on the site before (or have a
 * permissive autoplay policy), so this succeeds automatically some of the
 * time and is blocked the rest. Either way the UI stays honest: if the
 * unmuted attempt is rejected, it falls back to a silently looping track
 * (which autoplay always allows) and the toggle shows "off" until the
 * visitor taps it - a real gesture, so play-with-sound is then guaranteed
 * to work.
 */
const MusicToggle = () => {
  const audioRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [everEnabled, setEverEnabled] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = false
    audio.play()
      .then(() => {
        setEnabled(true)
        setEverEnabled(true)
      })
      .catch(() => {
        // Autoplay-with-sound was blocked - keep the track primed and
        // looping silently in the background instead.
        audio.muted = true
        audio.play().catch(() => {})
        setEnabled(false)
      })
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    const next = !enabled
    setEnabled(next)
    if (next) {
      setEverEnabled(true)
      audio.muted = false
      audio.play().catch(() => {})
      localStorage.setItem(STORAGE_KEY, '1')
    } else {
      audio.muted = true
      localStorage.setItem(STORAGE_KEY, '0')
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient-background.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={enabled ? 'Turn background music off' : 'Turn background music on'}
        aria-pressed={enabled}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          enabled
            ? 'bg-primary text-white hover:bg-primary-600'
            : 'bg-white text-gray-700 hover:text-primary border border-gray-200'
        } ${!everEnabled ? 'animate-pulse' : ''}`}
        title={enabled ? 'Music on' : 'Music off'}
      >
        {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  )
}

export default MusicToggle
