import React, { createContext, useContext, useEffect, useState } from "react"

// define the layers state
interface LayerState {
    available: string[],
    active: string[],
    toggle: (layerName: string) => void,
    activate: (layerName: string) => void,
    deactivate: (layerName: string) => void
}

const initialState: LayerState = {
    available: [],
    active: ['labels'],
    toggle: (layerName: string) => {},
    activate: (layerName: string) => {},
    deactivate: (layerName: string) => {}
}

// create the context
const LayerContext = createContext(initialState)

export const LayerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // layer provider state
    const [available, setAvailable] = useState<string[]>([])
    const [active, setActive] = useState<string[]>([])

    // define the toggle function
    const toggle = (layerName: string) => {
        let newActive: string[] = []
        if (active.includes(layerName)) {
            newActive = active.filter(l => l !== layerName)
        } else {
            newActive = [layerName, ...active]
        }
        setActive(newActive)
    }

    const activate = (layerName: string) => {
        if (!active.includes(layerName)) {
            const newActive = [layerName, ...active]
            setActive(newActive)
        }
    }

    const deactivate = (layerName: string) => {
        const newActive = active.filter(l => l !== layerName)
        setActive(newActive)
    }

    // effect to set default values
    useEffect(() => {
        setAvailable(['labels', 'stations'])
        setActive(['stations'])
    }, [])

    // create the context value
    const value = {
        available,
        active,
        toggle,
        activate,
        deactivate
    }

    return (
        <LayerContext.Provider value={value}>
            { children }
        </LayerContext.Provider>
    )
}

// create a hook
export const useLayers = () => {
    return useContext(LayerContext)
}
