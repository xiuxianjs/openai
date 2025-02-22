import { PrimaryDiv, SecondaryDiv } from '@alemonjs/react-ui'
import '@alemonjs/react-ui/theme'
import '@alemonjs/react-ui/style.css'
import Form from './From'
export default function App() {
  return (
    <SecondaryDiv className="flex-1 flex items-center justify-center p-8">
      <PrimaryDiv className="rounded-lg shadow-inner w-full p-8">
        <div className="flex justify-center text-3xl">OpanAI</div>
        <Form />
      </PrimaryDiv>
    </SecondaryDiv>
  )
}
