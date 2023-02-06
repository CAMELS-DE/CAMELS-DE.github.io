import { IonSegment, IonSegmentButton } from "@ionic/react"
import { useEffect, useState } from "react"
import { Prism as SyntaxHighligher } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'


const CODE: {[key: string]: string} = {
    r: "library(jsonlite)\nlibrary(plotly)\n\n# create a Plotly.js metric chart\nfig <- plot_ly(type='scatter', x=c(1,2,3,4), y=c(4,8,2,1), mode='markers+lines')\n\n# Save the figure to JSON\nfigjson <- plotly:::to_JSON(plotly_build(fig))\ncat(figjson, file='output_data/metrics/foobar.plotly.json')\n\n# Save some desciptions\nbody <- jsonlite::toJSON(list(title='Foobar', body='This is not a real metric'), simplifyVector=F)\ncat(body, file='output_data/metrics/foobar.description.json')",
    python: "import json\nimport plotly.graph_objects as go\n\n# create a Plotly.js metric chart \nfig = go.Figure(go.Scatter(x=[1,2,3,4], y=[4,8,2,1], mode='lines+markers'))\n\n# Save the figure to JSON\nwith open('output_data/metrics/foobar.plotly.json', 'w') as f:\n\tf.write(fig.to_json())\n\n# Save some descriptions\nwith open('output_data/metrics/foobar.description.json') as f:\n\tjson.dump(dict(title='Foobar', body='This is not a real metric'), f)"
}

const CreateMetricSegments: React.FC = () => {
    // component state
    const [currentSegment, setCurrentSegment] = useState<string>('r')
    const [currentCode, setCurrentCode] = useState<string>(CODE.r)
    
    // change the code when segment changes
    useEffect(() => {
        setCurrentCode(CODE[currentSegment])
    }, [currentSegment])
    
    return <>
        <IonSegment value={currentSegment} onIonChange={e => setCurrentSegment(e.target.value as string)}>
            <IonSegmentButton value="r">R</IonSegmentButton>
            <IonSegmentButton value="python">Python</IonSegmentButton>
        </IonSegment>
        <SyntaxHighligher language={currentSegment} style={darcula}>
            { currentCode }
        </SyntaxHighligher>
    </>
}

export default CreateMetricSegments