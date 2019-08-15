import React from 'react'
import { MicroAppComponent } from 'mf-maestro'

export default function Topics() {
  const options = {}
  return (
    <div>
      <h2>Topics</h2>
      <MicroAppComponent
        app="micro-app-1"
        manifestUrl="http://localhost:3000/assets/manifest.json"
        options={options}
      />
    </div>
  )
}
