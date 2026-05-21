import Typewriter from "typewriter-effect"


const TypeWritingEffect = () => {
  return (
    <div>
        <Typewriter
          options={{
            strings:[
                "AI/ML Engineer",
                "RAG Systems Builder",
                "Cybersecurity Analyst",
                "Full-Stack Technocrat"
            ],
            autoStart:true,
            loop:true,
            deleteSpeed:50
          }}
        />
        
    </div>
  )
}

export default TypeWritingEffect
