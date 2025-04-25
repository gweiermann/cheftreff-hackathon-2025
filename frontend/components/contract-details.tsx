"use client"

import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"

interface ContractDetailsProps {
  onFinish: () => void
}

export default function ContractDetails({ onFinish }: ContractDetailsProps) {
  const contractInfo = {
    title: "Contract: Solar Panels, John Doe",
    content: `
# Installation Instructions

## Required Work
- Install 12 solar panels on the south-facing roof
- Connect all panels to the inverter system
- Test the system for proper voltage output
- Clean up the work area

## Safety Requirements
- Use proper fall protection equipment
- Disconnect main power before connecting to the electrical system
- Verify all connections before system activation

## Quality Standards
- All panels must be properly aligned
- No visible gaps between mounting hardware
- Wiring must be neatly secured and protected
- System must produce expected voltage output
    `,
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">{contractInfo.title}</h1>
      </header>

      <div className="flex-1 p-4 overflow-auto">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{contractInfo.content}</ReactMarkdown>
        </div>
      </div>

      <div className="p-4 border-t">
        <Button onClick={onFinish} className="w-full">
          Finish up
        </Button>
      </div>
    </div>
  )
}
