interface HotdogExProps {
  hotdog: {
    id: string | number,
    generated_prompt: string,
    generated_kanji: string
  },
  noBackground?: boolean
}

export default function HotdogEx ({ hotdog, noBackground }: HotdogExProps) {
  if (noBackground ){
    return (
      <article className="grid text-neutral-100">
      <h2 className={'flex items-center font-thin text-neutral-100 text-9xl font-longinus tracking-wide -mb-2'}>
        <svg className={'text-neutral-100 w-[25.5rem]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.44 94.99"><path  d="M43.25,91.44c-.14-.06-.28-.12-.42-.18-.31-.14-.63-.28-.97-.38-1.83-.52-2.76-1.76-2.87-3.78-.04-.71-.04-1.44-.04-2.06,0-25.2,0-50.41,0-75.61,0-.57,0-1.32,.05-2.06,.11-1.87,1.01-3.06,2.74-3.62,.41-.13,.79-.34,1.17-.53,.17-.09,.33-.17,.5-.26l.17-.08-.19-1.26-.19-.02c-3.43-.4-6.93-.32-10.32-.24-1.21,.03-2.42,.06-3.63,.06-.37,0-.69,.26-1.06,.57-.17,.14-.36,.29-.56,.43l-.31,.21,.31,.21c.21,.14,.38,.27,.52,.37,.27,.2,.46,.35,.7,.41,2.39,.55,3.39,2.04,3.36,4.95-.05,4.41-.04,8.89-.03,13.22,0,2.76,0,5.52,0,8.27,0,2.34-.03,2.37-2.42,2.38-1.93,0-3.86,0-5.8,0-3.11,0-6.32-.02-9.48,.04-.93,.03-1.49-.13-1.83-.47-.34-.33-.49-.91-.48-1.81,.09-6.85,.15-13.55-.02-20.21-.09-3.33,.56-5.75,4.02-6.75,.2-.06,.26-.27,.3-.46,.01-.05,.02-.1,.04-.14l.06-.16-.13-.11C15.23,1.35,5.12,.71,2.19,1.45c-.33,.08-.58,.35-.96,.75-.21,.22-.47,.5-.81,.82l-.42,.4,.58,.04c4.43,.28,4.76,2.68,4.75,6.04-.05,18.74-.05,37.8-.04,56.22,0,6.64,0,13.27,0,19.91,0,4.03-.04,4.09-3.85,5.62-.17,.07-.23,.22-.33,.46-.05,.13-.12,.29-.22,.51l-.13,.26,.28,.09c.24,.08,.47,.16,.7,.25,.52,.2,1,.38,1.52,.41,2.29,.13,4.26,.2,5.93,.2,3.98,0,6.27-.39,7.22-1.2l.1-.15-.02-.13c0-.08,0-.2-.07-.3l-.05-.07c-.1-.16-.22-.35-.43-.41-3.19-.82-3.82-3.03-3.8-6.33,.06-10.81,.05-21.8,.05-32.43,0-4.81,0-9.63,0-14.44,0-.67,.05-1.34,.1-2.05,.02-.27,.04-.55,.06-.84h4.83c4.5,0,8.89,0,13.29,0,.6,0,1.02,.13,1.29,.4,.29,.29,.42,.76,.41,1.45-.02,2.08-.01,4.17,0,6.25,0,1.02,0,2.05,0,3.07v9.2c0,10.22,0,20.45,0,30.67,0,3.04-.42,3.68-3.2,4.84-.31,.13-.56,.37-.82,.62-.11,.11-.23,.22-.36,.33l-.27,.23,.3,.18c1.51,.9,12.24,1.37,14.55,.83,.35-.08,.68-.19,1.01-.3,.15-.05,.3-.1,.45-.15l.34-.11-.86-1.13-.06-.03Z"/><path  d="M173.21,5.93c-2.91-2.82-5.87-4.28-9.03-4.46-4.2-.23-8.48-.17-12.61-.12-1.06,.01-2.13,.03-3.19,.04-.44,0-.86,.25-1.33,.53-.24,.14-.49,.29-.79,.43l-.45,.22,.44,.23q4.56,2.37,4.56,7.32V84.94c0,.57,0,1.14-.02,1.71v.88c-.02,1.49-.75,2.52-2.23,3.14-.41,.17-.84,.33-1.26,.48l-.74,.27-.12,1.22,.21,.05c.25,.06,.5,.13,.75,.2,.56,.16,1.14,.33,1.73,.33,2.38,.03,4.81,.03,7.15,.02,2.02,0,4.04,0,6.06,.01,.05,0,.1,0,.15,0,4.25,0,7.91-1.53,11.2-4.66,3.44-3.28,6.05-7.39,7.76-12.23,5.79-16.42,6.37-33.86,1.73-51.85-2.09-8.11-5.26-14.02-9.98-18.6Zm-15.51,41.16v-12.46c0-9.14,0-18.28,0-27.42,0-3.5,.07-3.5,3.56-3.56,4.31-.09,7.79,1.84,10.67,5.84,3.26,4.53,4.59,9.93,5.67,15.06,2.47,11.71,1.94,23.82,1.48,34.51-.35,7.99-1.92,15.25-4.67,21.56-1.35,3.1-3.21,6.55-6.82,8.69-2.41,1.43-5.14,1.93-8.33,1.52-.5-.06-1.16-.9-1.5-1.64-.18-.41-.15-.94-.11-1.5,.02-.24,.03-.47,.03-.7V47.09Z"/><path  d="M231.66,16.6c-1.62-5-3.64-8.68-6.38-11.57-5.26-5.56-12.51-6.01-18.46-1.15-3.97,3.24-5.88,7.69-7.24,11.6-2.33,6.77-3.68,14.26-4.11,22.91-.64,12.86-.13,22.66,1.67,31.75,1.46,7.39,3.28,13.34,7.45,18.4,2.95,3.58,6.8,5.54,10.86,5.54,.08,0,.17,0,.25,0,4.17-.08,8.06-2.22,10.95-6.02,2.46-3.24,4.29-7.21,5.75-12.47,2.35-8.45,3.43-17.82,3.23-27.85,.16-12.4-1.1-22.29-3.96-31.14Zm-28.07,5.79c.77-3.39,1.89-6.76,2.98-10.02,.39-1.16,.78-2.33,1.15-3.5,.19-.59,.59-1.15,.99-1.69l.17-.23c1.83-2.55,4.05-3.9,6.43-3.9,.06,0,.12,0,.18,0,2.54,.07,5.14,1.73,6.77,4.31,3.37,5.33,4.54,11.46,5.37,16.78,1.46,9.37,1.97,19.33,1.52,29.6-.41,9.31-1.03,18.37-3.97,26.95-.87,2.53-1.91,4.79-3.1,6.74-1.54,2.52-3.84,4.02-6.33,4.11-2.51,.08-4.95-1.25-6.7-3.69-3.32-4.62-4.42-10.17-5.49-15.54l-.02-.08c-1.75-8.81-1.77-17.56-1.56-24.96h0c-.23-7.59-.31-16.38,1.61-24.89Z"/><path  d="M286.11,38.74c-.27-.27-.51-.51-.81-.51-6.84-.04-13.72-.03-20.45,.01-.31,0-.54,.28-.77,.55-.08,.1-.17,.2-.25,.28l-.1,.09,.23,1.27h2.09c1.39,0,2.78-.01,4.17,0,3.87,.05,4.88,1.04,4.89,4.82,0,1.71,.01,3.42,.02,5.12,.03,5.37,.06,10.92-.06,16.37-.08,3.6-.22,7.78-1.03,11.78-.74,3.69-1.95,7.09-3.5,9.84-1.44,2.56-3.32,4-5.42,4.15-2.23,.18-4.53-1.13-6.48-3.64-2.01-2.59-3.23-5.94-3.97-8.24-2.38-7.4-3.52-15.65-3.57-25.97-.04-8.9,.3-18.19,1.02-27.63,.49-6.35,1.94-12.12,4.34-17.15,1.97-4.15,4.81-6.57,8-6.83,3.19-.25,6.38,1.69,8.99,5.46,3.05,4.42,4.69,9.26,4.88,14.37,0,.21,0,.42,0,.64,0,1.21,0,2.58,1.39,3.48l.23,.15,.13-.24c1.03-1.93-.82-22.67-2.25-25.23l-.16-.29-.23,.24c-2.68,2.74-2.87,2.78-5.23,1.1-5.79-4.13-13.13-2.05-17.09,2.01-3.82,3.91-6.33,9.06-7.9,16.21-3.91,17.8-3.84,35.89,.2,53.75,1.68,7.42,4.3,12.31,8.5,15.86,2.77,2.34,5.69,3.55,8.49,3.55,.32,0,.63-.02,.95-.05,3-.3,5.72-1.96,8.08-4.93,.34-.43,.7-.85,1.05-1.26l.36-.42,.25,.1c0,.23,0,.46,0,.68,0,.62,.01,1.27-.01,1.9-.07,1.48,.53,2.26,2,2.59,2.08,.47,3.26,.61,3.97,.04,.72-.57,.85-1.75,.86-3.87,0-.54,0-1.08,0-1.62v-12.01c0-9.96,0-19.93,0-29.89,0-3.7,.14-3.89,3.65-5.09,.24-.08,.41-.27,.61-.49,.09-.1,.19-.22,.32-.33l.2-.2-.22-.18c-.14-.12-.27-.24-.38-.36Z"/><path  d="M83.96,18.88c-1.76-6.27-4-10.58-7.27-13.97-5.1-5.29-12.6-5.88-17.83-1.41-2.75,2.35-4.88,5.23-6.31,8.55-3.42,7.91-5.25,16.66-5.42,26.02-.02,1.17-.05,2.34-.07,3.52-.21,9.29-.42,18.9,1.57,28.26,1.2,5.61,2.65,11.52,6.11,16.76,3.18,4.82,7.63,7.44,12.26,7.44,1.54,0,3.1-.29,4.64-.88,2.73-1.05,5.03-2.92,7.04-5.72,2.32-3.24,4.01-6.99,5.32-11.81,2.44-8.98,3.48-18.4,3.08-28.02,.4-10.43-.61-19.82-3.11-28.71Zm-29.51,7.5c.9-5.91,1.91-11.65,4.5-16.85,.76-1.53,1.91-3.06,3.34-4.43,1.41-1.36,3.03-2.04,4.69-2.04s3.26,.64,4.77,1.93c2.58,2.2,3.81,5.3,4.77,8.03,1.91,5.48,3.1,11.67,3.63,18.95,.26,3.57,.41,7.21,.56,10.73,.07,1.59,.13,3.17,.21,4.76,.04,10.93-.86,19.9-2.81,28.22-.85,3.61-2.21,7.09-3.31,9.73-.55,1.32-1.57,2.72-2.96,4.07-2.86,2.77-6.56,2.79-9.65,.03-3.79-3.37-4.92-8-6.02-12.49-1.9-7.74-2.82-16-2.75-24.56,.01-1.76,.01-3.53,0-5.29,0-6.83-.02-13.88,1.02-20.78Z"/><path  d="M379.48,71.92c-.02-.21-.03-.42-.03-.63v-.21l-1.2-.24-.08,.18c-.12,.25-.24,.49-.36,.73-.27,.54-.55,1.1-.75,1.68-.3,.89-.58,1.81-.85,2.7-.35,1.14-.7,2.32-1.12,3.46-2.33,6.39-6.39,9.89-12.41,10.71-2.66,.36-5.01,.56-7.18,.6-2,.03-3.2-.26-3.91-.95-.73-.72-1.05-1.93-1.05-4.04-.01-16.05,0-32.11,0-48.16,0-.62,.05-1.25,.1-1.86,.02-.22,.03-.43,.05-.65,1.05,0,2.09-.03,3.1-.06,2.4-.06,4.67-.12,6.92,.13,4.56,.5,6.67,2.89,6.84,7.75,.02,.7,.15,1.41,.28,2.09,.06,.31,.11,.62,.16,.94l.03,.23,1.48-.13v-.22c.33-7.61,.34-15.37,.02-23.72v-.23s-1.6-.04-1.6-.04l-.03,.23c-.04,.3-.08,.6-.13,.9-.1,.65-.2,1.33-.22,2-.15,4.92-1.91,7.03-6.47,7.8-1.99,.34-4.08,.38-6.1,.42-.95,.02-1.93,.04-2.89,.09-.53,.02-.92-.07-1.16-.3-.27-.25-.4-.69-.39-1.34,0-2.97,0-5.95,0-8.92,0-5.05,0-10.28,.04-15.42,.02-2.29,1.16-3.53,3.38-3.68,5.18-.35,9.46,.27,13.07,1.9,2.24,1.01,4.18,2.58,5.2,4.21,1.29,2.07,2.23,4.42,3.14,6.69,.41,1.02,.83,2.08,1.29,3.1,.25,.57,.55,1.14,.83,1.68,.13,.25,.27,.51,.39,.76l.11,.21,1.37-.59-.06-.21c-2.12-7.17-4.22-14.14-6.5-20.59l-.06-.18h-.19c-1.17,.08-2.29,.16-3.37,.24-2.27,.16-4.42,.32-6.55,.35-4.14,.05-8.35,.04-12.42,.04-2.77,0-5.53,0-8.3,0-.12,0-.24,0-.37-.01-.86-.04-2.04-.1-2.3,1.9l-.04,.27h.28c1.52,.05,2.59,.42,3.25,1.12,1.03,1.1,.98,2.88,.92,4.76-.01,.42-.03,.85-.03,1.26,0,7.13,0,14.26,0,21.39,0,17.35,0,35.29,.06,52.93,.01,3.35-.65,5.58-3.97,6.37-.19,.04-.25,.22-.34,.5-.04,.14-.1,.32-.19,.56l-.11,.28,.3,.05c.31,.06,.61,.12,.91,.19,.65,.15,1.27,.29,1.91,.29,2.54,.02,5.08,.01,7.63,0,3.44,0,7-.01,10.5,.04,.91,.01,1.84-.02,2.74-.05,3.22-.12,6.27-.23,9.03,1.64l.18,.12,.15-.17c.11-.13,.2-.23,.28-.3,.14-.14,.24-.25,.29-.4l.43-1.37c1.98-6.35,4.04-12.92,6.01-19.4,.14-.46,.1-.96,.07-1.44Z"/><path  d="M426.03,91.22h-.17c-3.64-.28-5.04-2.59-6.03-5.98-1.1-3.77-2.21-7.53-3.32-11.29-2.72-9.23-5.53-18.78-8.21-28.2-.45-1.59-.47-3.52-.04-5.15,.9-3.44,2.01-6.9,3.08-10.25,.38-1.2,.77-2.4,1.14-3.6l1.26-4.05c1.43-4.58,2.9-9.32,4.41-13.96,1.11-3.43,2.86-5.02,5.67-5.16,.34-.02,.63-.22,.97-.47,.16-.12,.34-.24,.55-.36l.33-.19-.3-.23c-.19-.14-.35-.28-.49-.41-.3-.27-.54-.48-.84-.49-4.54-.07-8.6-.08-12.43-.03-.35,0-.64,.29-.92,.58-.11,.11-.22,.22-.32,.3l-.24,.19,.24,.2c.1,.09,.2,.18,.3,.27,.25,.23,.51,.48,.83,.62,.27,.12,.56,.13,.84,.14,.17,0,.34,.01,.48,.04,2.7,.54,3.55,1.76,3.12,4.52-.11,.73-.32,1.43-.57,2.22-2.24,7.16-4.48,14.32-6.74,21.48-.5,1.58-1.03,3.18-1.55,4.73-.2,.6-.4,1.19-.6,1.79-.59-.68-.82-1.27-.98-1.81-1.84-6.17-3.47-11.69-4.98-16.87l-.54-1.85c-.97-3.3-1.97-6.71-2.87-10.09-.62-2.35-.18-3.17,2.19-4.03,.44-.16,.88-.33,1.38-.51l1.19-.45-.34-.28c-1.57-1.29-10.22-1.86-14.29-1.21-.41,.07-.77,.31-1.12,.55-.15,.1-.29,.2-.44,.29l-.14,.08,.1,.87,.17,.04c2.28,.51,3.59,1.74,4.23,3.99,1.75,6.13,3.57,12.35,5.32,18.37,1.93,6.6,3.92,13.43,5.83,20.15,.34,1.21,.31,2.79-.1,4.11-2.25,7.34-4.59,14.78-6.85,21.98-1.4,4.44-2.79,8.89-4.18,13.33-.89,2.87-2.36,5.81-6.48,5.89-.22,0-.38,.14-.62,.33-.12,.1-.26,.22-.45,.35l-.23,.16,.18,.21c1.2,1.37,2.59,1.25,3.81,1.15,.45-.04,.87-.07,1.27-.04,1.73,.14,3.49,.14,5.21,0,.39-.03,.8,0,1.23,.04,1.23,.1,2.61,.22,3.78-1.24l.2-.25-.3-.13c-.22-.09-.41-.19-.58-.28-.35-.17-.65-.32-.99-.38-2.35-.43-3.53-.95-4.05-1.81-.5-.83-.44-2.08,.21-4.19,2.84-9.18,5.77-18.49,8.61-27.5l1.37-4.35c.1-.32,.25-.62,.49-1.08,.07-.13,.14-.27,.22-.43l.84,2.82c.66,2.2,1.26,4.22,1.85,6.24l1.94,6.58c1.94,6.55,3.94,13.32,5.86,19.99,.36,1.24,.36,2.07,.02,2.61-.36,.56-1.13,.9-2.52,1.12-.45,.07-.86,.21-1.39,.39-.27,.09-.56,.19-.9,.3l-.52,.16,.46,.29c1.32,.84,7.53,1.31,11.96,1.31,1.86,0,3.42-.08,4.16-.26,.34-.08,.68-.19,1.01-.29,.15-.05,.3-.09,.45-.14l.24-.07-.42-1.42Z"/><path  d="M140.75,28.82c0-.19,0-.39,.02-.58,.02-.43,.04-.88-.03-1.32-.52-3.37-1.06-6.74-1.59-10.11l-.8-5.05c-.47-2.95-.93-5.9-1.38-8.85-.11-.74-.33-1.65-1-2.06-.5-.3-1.18-.3-2.09,0-1.17,.4-2.54,.44-3.74,.45h-.47c-6.3,.04-12.81,.09-19.21,0-.91-.02-1.83,.02-2.73,.04-3,.09-6.11,.19-9.3-1.22l-.3-.13-.05,.32c-.25,1.54-.51,3.05-.77,4.54-.58,3.41-1.13,6.63-1.58,9.91-.17,1.26-.39,2.53-.61,3.77-.59,3.34-1.19,6.8-.83,10.33l.08,.82,.39-.73c.65-1.23,.95-2.52,1.23-3.78,.06-.28,.13-.56,.19-.84,.25-1.04,.49-2.07,.73-3.11,.72-3.1,1.47-6.3,2.43-9.38,1.04-3.36,2.96-5.77,5.7-7.16,2.49-1.26,4.72-1.44,6.28-.49,1.55,.95,2.41,2.99,2.43,5.75v.55s0,74.27,0,74.27c0,.43,0,.87-.01,1.3,0,.43-.01,.86-.01,1.29,0,1.69-.71,2.77-2.24,3.38-.42,.17-.73,.53-1.03,.88-.12,.14-.25,.29-.38,.42l-.26,.26,.34,.15c.18,.08,.35,.18,.53,.28,.41,.24,.84,.48,1.3,.49,1.7,.04,3.46,.05,5.32,.05,1.6,0,3.28-.01,5.04-.04,.46,0,.91-.16,1.48-.34,.31-.1,.65-.22,1.06-.33l.48-.13-.39-.31c-.33-.25-.58-.47-.79-.66-.38-.33-.63-.55-.95-.64-1.97-.56-2.39-2.13-2.56-3.74-.08-.79-.08-1.61-.08-2.41v-.41c0-24.42,0-48.85,0-73.27v-.57c0-.57-.01-1.17,.03-1.74,.13-1.8,.79-3.19,1.91-4.04,1.14-.87,2.72-1.14,4.57-.78,3.84,.75,6.52,3.36,7.95,7.73,1.04,3.17,1.79,6.51,2.51,9.73,.32,1.42,.64,2.85,.98,4.26l.89,3.68,1.31-.23v-.21Z"/><path  d="M328.48,51.87c-10.51,.04-21.03,.04-31.54,0-1.9,0-2.63,.86-2.58,2.68,.05,2.07-.02,4.14,.02,6.2,.05,2.41,.3,2.68,2.7,2.7,5.17,.03,10.34,0,15.51,.01,5.17,0,10.34,.02,15.51,0,2.57-.01,2.99-.41,3.07-3,.06-1.98,.01-3.96,0-5.95,0-1.78-.8-2.65-2.69-2.64Z"/></svg>
        <span className="ml-8 scale-y-[1.02] scale-x-[0.65] mb-0 origin-left" style={{ fontFamily: 'Times New Roman' }}>
          {hotdog.id}
        </span>
      </h2>
      <p className={'font-kanji text-5xl mb-12'}>
        {`ホットドッグEX ${hotdog.id}`}
      </p>

      <p className="text-3xl w-3/4 mb-3">
        {hotdog.generated_prompt}
      </p>

      <p className="font-kanji tracking-wider w-3/4">
        {hotdog.generated_kanji}
      </p>
    </article>
    )
  }

  return (
    <div className="top-0 left-0 right-0 bottom-0 fixed h-full w-full bg-black z-[2000] flex px-24 items-center justify-center">
      <article className="grid text-neutral-100">
        <h2 className={'flex items-center font-thin text-neutral-100 text-9xl font-longinus tracking-wide -mb-2'}>
          <svg className={'text-neutral-100 w-[25.5rem]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.44 94.99"><path  d="M43.25,91.44c-.14-.06-.28-.12-.42-.18-.31-.14-.63-.28-.97-.38-1.83-.52-2.76-1.76-2.87-3.78-.04-.71-.04-1.44-.04-2.06,0-25.2,0-50.41,0-75.61,0-.57,0-1.32,.05-2.06,.11-1.87,1.01-3.06,2.74-3.62,.41-.13,.79-.34,1.17-.53,.17-.09,.33-.17,.5-.26l.17-.08-.19-1.26-.19-.02c-3.43-.4-6.93-.32-10.32-.24-1.21,.03-2.42,.06-3.63,.06-.37,0-.69,.26-1.06,.57-.17,.14-.36,.29-.56,.43l-.31,.21,.31,.21c.21,.14,.38,.27,.52,.37,.27,.2,.46,.35,.7,.41,2.39,.55,3.39,2.04,3.36,4.95-.05,4.41-.04,8.89-.03,13.22,0,2.76,0,5.52,0,8.27,0,2.34-.03,2.37-2.42,2.38-1.93,0-3.86,0-5.8,0-3.11,0-6.32-.02-9.48,.04-.93,.03-1.49-.13-1.83-.47-.34-.33-.49-.91-.48-1.81,.09-6.85,.15-13.55-.02-20.21-.09-3.33,.56-5.75,4.02-6.75,.2-.06,.26-.27,.3-.46,.01-.05,.02-.1,.04-.14l.06-.16-.13-.11C15.23,1.35,5.12,.71,2.19,1.45c-.33,.08-.58,.35-.96,.75-.21,.22-.47,.5-.81,.82l-.42,.4,.58,.04c4.43,.28,4.76,2.68,4.75,6.04-.05,18.74-.05,37.8-.04,56.22,0,6.64,0,13.27,0,19.91,0,4.03-.04,4.09-3.85,5.62-.17,.07-.23,.22-.33,.46-.05,.13-.12,.29-.22,.51l-.13,.26,.28,.09c.24,.08,.47,.16,.7,.25,.52,.2,1,.38,1.52,.41,2.29,.13,4.26,.2,5.93,.2,3.98,0,6.27-.39,7.22-1.2l.1-.15-.02-.13c0-.08,0-.2-.07-.3l-.05-.07c-.1-.16-.22-.35-.43-.41-3.19-.82-3.82-3.03-3.8-6.33,.06-10.81,.05-21.8,.05-32.43,0-4.81,0-9.63,0-14.44,0-.67,.05-1.34,.1-2.05,.02-.27,.04-.55,.06-.84h4.83c4.5,0,8.89,0,13.29,0,.6,0,1.02,.13,1.29,.4,.29,.29,.42,.76,.41,1.45-.02,2.08-.01,4.17,0,6.25,0,1.02,0,2.05,0,3.07v9.2c0,10.22,0,20.45,0,30.67,0,3.04-.42,3.68-3.2,4.84-.31,.13-.56,.37-.82,.62-.11,.11-.23,.22-.36,.33l-.27,.23,.3,.18c1.51,.9,12.24,1.37,14.55,.83,.35-.08,.68-.19,1.01-.3,.15-.05,.3-.1,.45-.15l.34-.11-.86-1.13-.06-.03Z"/><path  d="M173.21,5.93c-2.91-2.82-5.87-4.28-9.03-4.46-4.2-.23-8.48-.17-12.61-.12-1.06,.01-2.13,.03-3.19,.04-.44,0-.86,.25-1.33,.53-.24,.14-.49,.29-.79,.43l-.45,.22,.44,.23q4.56,2.37,4.56,7.32V84.94c0,.57,0,1.14-.02,1.71v.88c-.02,1.49-.75,2.52-2.23,3.14-.41,.17-.84,.33-1.26,.48l-.74,.27-.12,1.22,.21,.05c.25,.06,.5,.13,.75,.2,.56,.16,1.14,.33,1.73,.33,2.38,.03,4.81,.03,7.15,.02,2.02,0,4.04,0,6.06,.01,.05,0,.1,0,.15,0,4.25,0,7.91-1.53,11.2-4.66,3.44-3.28,6.05-7.39,7.76-12.23,5.79-16.42,6.37-33.86,1.73-51.85-2.09-8.11-5.26-14.02-9.98-18.6Zm-15.51,41.16v-12.46c0-9.14,0-18.28,0-27.42,0-3.5,.07-3.5,3.56-3.56,4.31-.09,7.79,1.84,10.67,5.84,3.26,4.53,4.59,9.93,5.67,15.06,2.47,11.71,1.94,23.82,1.48,34.51-.35,7.99-1.92,15.25-4.67,21.56-1.35,3.1-3.21,6.55-6.82,8.69-2.41,1.43-5.14,1.93-8.33,1.52-.5-.06-1.16-.9-1.5-1.64-.18-.41-.15-.94-.11-1.5,.02-.24,.03-.47,.03-.7V47.09Z"/><path  d="M231.66,16.6c-1.62-5-3.64-8.68-6.38-11.57-5.26-5.56-12.51-6.01-18.46-1.15-3.97,3.24-5.88,7.69-7.24,11.6-2.33,6.77-3.68,14.26-4.11,22.91-.64,12.86-.13,22.66,1.67,31.75,1.46,7.39,3.28,13.34,7.45,18.4,2.95,3.58,6.8,5.54,10.86,5.54,.08,0,.17,0,.25,0,4.17-.08,8.06-2.22,10.95-6.02,2.46-3.24,4.29-7.21,5.75-12.47,2.35-8.45,3.43-17.82,3.23-27.85,.16-12.4-1.1-22.29-3.96-31.14Zm-28.07,5.79c.77-3.39,1.89-6.76,2.98-10.02,.39-1.16,.78-2.33,1.15-3.5,.19-.59,.59-1.15,.99-1.69l.17-.23c1.83-2.55,4.05-3.9,6.43-3.9,.06,0,.12,0,.18,0,2.54,.07,5.14,1.73,6.77,4.31,3.37,5.33,4.54,11.46,5.37,16.78,1.46,9.37,1.97,19.33,1.52,29.6-.41,9.31-1.03,18.37-3.97,26.95-.87,2.53-1.91,4.79-3.1,6.74-1.54,2.52-3.84,4.02-6.33,4.11-2.51,.08-4.95-1.25-6.7-3.69-3.32-4.62-4.42-10.17-5.49-15.54l-.02-.08c-1.75-8.81-1.77-17.56-1.56-24.96h0c-.23-7.59-.31-16.38,1.61-24.89Z"/><path  d="M286.11,38.74c-.27-.27-.51-.51-.81-.51-6.84-.04-13.72-.03-20.45,.01-.31,0-.54,.28-.77,.55-.08,.1-.17,.2-.25,.28l-.1,.09,.23,1.27h2.09c1.39,0,2.78-.01,4.17,0,3.87,.05,4.88,1.04,4.89,4.82,0,1.71,.01,3.42,.02,5.12,.03,5.37,.06,10.92-.06,16.37-.08,3.6-.22,7.78-1.03,11.78-.74,3.69-1.95,7.09-3.5,9.84-1.44,2.56-3.32,4-5.42,4.15-2.23,.18-4.53-1.13-6.48-3.64-2.01-2.59-3.23-5.94-3.97-8.24-2.38-7.4-3.52-15.65-3.57-25.97-.04-8.9,.3-18.19,1.02-27.63,.49-6.35,1.94-12.12,4.34-17.15,1.97-4.15,4.81-6.57,8-6.83,3.19-.25,6.38,1.69,8.99,5.46,3.05,4.42,4.69,9.26,4.88,14.37,0,.21,0,.42,0,.64,0,1.21,0,2.58,1.39,3.48l.23,.15,.13-.24c1.03-1.93-.82-22.67-2.25-25.23l-.16-.29-.23,.24c-2.68,2.74-2.87,2.78-5.23,1.1-5.79-4.13-13.13-2.05-17.09,2.01-3.82,3.91-6.33,9.06-7.9,16.21-3.91,17.8-3.84,35.89,.2,53.75,1.68,7.42,4.3,12.31,8.5,15.86,2.77,2.34,5.69,3.55,8.49,3.55,.32,0,.63-.02,.95-.05,3-.3,5.72-1.96,8.08-4.93,.34-.43,.7-.85,1.05-1.26l.36-.42,.25,.1c0,.23,0,.46,0,.68,0,.62,.01,1.27-.01,1.9-.07,1.48,.53,2.26,2,2.59,2.08,.47,3.26,.61,3.97,.04,.72-.57,.85-1.75,.86-3.87,0-.54,0-1.08,0-1.62v-12.01c0-9.96,0-19.93,0-29.89,0-3.7,.14-3.89,3.65-5.09,.24-.08,.41-.27,.61-.49,.09-.1,.19-.22,.32-.33l.2-.2-.22-.18c-.14-.12-.27-.24-.38-.36Z"/><path  d="M83.96,18.88c-1.76-6.27-4-10.58-7.27-13.97-5.1-5.29-12.6-5.88-17.83-1.41-2.75,2.35-4.88,5.23-6.31,8.55-3.42,7.91-5.25,16.66-5.42,26.02-.02,1.17-.05,2.34-.07,3.52-.21,9.29-.42,18.9,1.57,28.26,1.2,5.61,2.65,11.52,6.11,16.76,3.18,4.82,7.63,7.44,12.26,7.44,1.54,0,3.1-.29,4.64-.88,2.73-1.05,5.03-2.92,7.04-5.72,2.32-3.24,4.01-6.99,5.32-11.81,2.44-8.98,3.48-18.4,3.08-28.02,.4-10.43-.61-19.82-3.11-28.71Zm-29.51,7.5c.9-5.91,1.91-11.65,4.5-16.85,.76-1.53,1.91-3.06,3.34-4.43,1.41-1.36,3.03-2.04,4.69-2.04s3.26,.64,4.77,1.93c2.58,2.2,3.81,5.3,4.77,8.03,1.91,5.48,3.1,11.67,3.63,18.95,.26,3.57,.41,7.21,.56,10.73,.07,1.59,.13,3.17,.21,4.76,.04,10.93-.86,19.9-2.81,28.22-.85,3.61-2.21,7.09-3.31,9.73-.55,1.32-1.57,2.72-2.96,4.07-2.86,2.77-6.56,2.79-9.65,.03-3.79-3.37-4.92-8-6.02-12.49-1.9-7.74-2.82-16-2.75-24.56,.01-1.76,.01-3.53,0-5.29,0-6.83-.02-13.88,1.02-20.78Z"/><path  d="M379.48,71.92c-.02-.21-.03-.42-.03-.63v-.21l-1.2-.24-.08,.18c-.12,.25-.24,.49-.36,.73-.27,.54-.55,1.1-.75,1.68-.3,.89-.58,1.81-.85,2.7-.35,1.14-.7,2.32-1.12,3.46-2.33,6.39-6.39,9.89-12.41,10.71-2.66,.36-5.01,.56-7.18,.6-2,.03-3.2-.26-3.91-.95-.73-.72-1.05-1.93-1.05-4.04-.01-16.05,0-32.11,0-48.16,0-.62,.05-1.25,.1-1.86,.02-.22,.03-.43,.05-.65,1.05,0,2.09-.03,3.1-.06,2.4-.06,4.67-.12,6.92,.13,4.56,.5,6.67,2.89,6.84,7.75,.02,.7,.15,1.41,.28,2.09,.06,.31,.11,.62,.16,.94l.03,.23,1.48-.13v-.22c.33-7.61,.34-15.37,.02-23.72v-.23s-1.6-.04-1.6-.04l-.03,.23c-.04,.3-.08,.6-.13,.9-.1,.65-.2,1.33-.22,2-.15,4.92-1.91,7.03-6.47,7.8-1.99,.34-4.08,.38-6.1,.42-.95,.02-1.93,.04-2.89,.09-.53,.02-.92-.07-1.16-.3-.27-.25-.4-.69-.39-1.34,0-2.97,0-5.95,0-8.92,0-5.05,0-10.28,.04-15.42,.02-2.29,1.16-3.53,3.38-3.68,5.18-.35,9.46,.27,13.07,1.9,2.24,1.01,4.18,2.58,5.2,4.21,1.29,2.07,2.23,4.42,3.14,6.69,.41,1.02,.83,2.08,1.29,3.1,.25,.57,.55,1.14,.83,1.68,.13,.25,.27,.51,.39,.76l.11,.21,1.37-.59-.06-.21c-2.12-7.17-4.22-14.14-6.5-20.59l-.06-.18h-.19c-1.17,.08-2.29,.16-3.37,.24-2.27,.16-4.42,.32-6.55,.35-4.14,.05-8.35,.04-12.42,.04-2.77,0-5.53,0-8.3,0-.12,0-.24,0-.37-.01-.86-.04-2.04-.1-2.3,1.9l-.04,.27h.28c1.52,.05,2.59,.42,3.25,1.12,1.03,1.1,.98,2.88,.92,4.76-.01,.42-.03,.85-.03,1.26,0,7.13,0,14.26,0,21.39,0,17.35,0,35.29,.06,52.93,.01,3.35-.65,5.58-3.97,6.37-.19,.04-.25,.22-.34,.5-.04,.14-.1,.32-.19,.56l-.11,.28,.3,.05c.31,.06,.61,.12,.91,.19,.65,.15,1.27,.29,1.91,.29,2.54,.02,5.08,.01,7.63,0,3.44,0,7-.01,10.5,.04,.91,.01,1.84-.02,2.74-.05,3.22-.12,6.27-.23,9.03,1.64l.18,.12,.15-.17c.11-.13,.2-.23,.28-.3,.14-.14,.24-.25,.29-.4l.43-1.37c1.98-6.35,4.04-12.92,6.01-19.4,.14-.46,.1-.96,.07-1.44Z"/><path  d="M426.03,91.22h-.17c-3.64-.28-5.04-2.59-6.03-5.98-1.1-3.77-2.21-7.53-3.32-11.29-2.72-9.23-5.53-18.78-8.21-28.2-.45-1.59-.47-3.52-.04-5.15,.9-3.44,2.01-6.9,3.08-10.25,.38-1.2,.77-2.4,1.14-3.6l1.26-4.05c1.43-4.58,2.9-9.32,4.41-13.96,1.11-3.43,2.86-5.02,5.67-5.16,.34-.02,.63-.22,.97-.47,.16-.12,.34-.24,.55-.36l.33-.19-.3-.23c-.19-.14-.35-.28-.49-.41-.3-.27-.54-.48-.84-.49-4.54-.07-8.6-.08-12.43-.03-.35,0-.64,.29-.92,.58-.11,.11-.22,.22-.32,.3l-.24,.19,.24,.2c.1,.09,.2,.18,.3,.27,.25,.23,.51,.48,.83,.62,.27,.12,.56,.13,.84,.14,.17,0,.34,.01,.48,.04,2.7,.54,3.55,1.76,3.12,4.52-.11,.73-.32,1.43-.57,2.22-2.24,7.16-4.48,14.32-6.74,21.48-.5,1.58-1.03,3.18-1.55,4.73-.2,.6-.4,1.19-.6,1.79-.59-.68-.82-1.27-.98-1.81-1.84-6.17-3.47-11.69-4.98-16.87l-.54-1.85c-.97-3.3-1.97-6.71-2.87-10.09-.62-2.35-.18-3.17,2.19-4.03,.44-.16,.88-.33,1.38-.51l1.19-.45-.34-.28c-1.57-1.29-10.22-1.86-14.29-1.21-.41,.07-.77,.31-1.12,.55-.15,.1-.29,.2-.44,.29l-.14,.08,.1,.87,.17,.04c2.28,.51,3.59,1.74,4.23,3.99,1.75,6.13,3.57,12.35,5.32,18.37,1.93,6.6,3.92,13.43,5.83,20.15,.34,1.21,.31,2.79-.1,4.11-2.25,7.34-4.59,14.78-6.85,21.98-1.4,4.44-2.79,8.89-4.18,13.33-.89,2.87-2.36,5.81-6.48,5.89-.22,0-.38,.14-.62,.33-.12,.1-.26,.22-.45,.35l-.23,.16,.18,.21c1.2,1.37,2.59,1.25,3.81,1.15,.45-.04,.87-.07,1.27-.04,1.73,.14,3.49,.14,5.21,0,.39-.03,.8,0,1.23,.04,1.23,.1,2.61,.22,3.78-1.24l.2-.25-.3-.13c-.22-.09-.41-.19-.58-.28-.35-.17-.65-.32-.99-.38-2.35-.43-3.53-.95-4.05-1.81-.5-.83-.44-2.08,.21-4.19,2.84-9.18,5.77-18.49,8.61-27.5l1.37-4.35c.1-.32,.25-.62,.49-1.08,.07-.13,.14-.27,.22-.43l.84,2.82c.66,2.2,1.26,4.22,1.85,6.24l1.94,6.58c1.94,6.55,3.94,13.32,5.86,19.99,.36,1.24,.36,2.07,.02,2.61-.36,.56-1.13,.9-2.52,1.12-.45,.07-.86,.21-1.39,.39-.27,.09-.56,.19-.9,.3l-.52,.16,.46,.29c1.32,.84,7.53,1.31,11.96,1.31,1.86,0,3.42-.08,4.16-.26,.34-.08,.68-.19,1.01-.29,.15-.05,.3-.09,.45-.14l.24-.07-.42-1.42Z"/><path  d="M140.75,28.82c0-.19,0-.39,.02-.58,.02-.43,.04-.88-.03-1.32-.52-3.37-1.06-6.74-1.59-10.11l-.8-5.05c-.47-2.95-.93-5.9-1.38-8.85-.11-.74-.33-1.65-1-2.06-.5-.3-1.18-.3-2.09,0-1.17,.4-2.54,.44-3.74,.45h-.47c-6.3,.04-12.81,.09-19.21,0-.91-.02-1.83,.02-2.73,.04-3,.09-6.11,.19-9.3-1.22l-.3-.13-.05,.32c-.25,1.54-.51,3.05-.77,4.54-.58,3.41-1.13,6.63-1.58,9.91-.17,1.26-.39,2.53-.61,3.77-.59,3.34-1.19,6.8-.83,10.33l.08,.82,.39-.73c.65-1.23,.95-2.52,1.23-3.78,.06-.28,.13-.56,.19-.84,.25-1.04,.49-2.07,.73-3.11,.72-3.1,1.47-6.3,2.43-9.38,1.04-3.36,2.96-5.77,5.7-7.16,2.49-1.26,4.72-1.44,6.28-.49,1.55,.95,2.41,2.99,2.43,5.75v.55s0,74.27,0,74.27c0,.43,0,.87-.01,1.3,0,.43-.01,.86-.01,1.29,0,1.69-.71,2.77-2.24,3.38-.42,.17-.73,.53-1.03,.88-.12,.14-.25,.29-.38,.42l-.26,.26,.34,.15c.18,.08,.35,.18,.53,.28,.41,.24,.84,.48,1.3,.49,1.7,.04,3.46,.05,5.32,.05,1.6,0,3.28-.01,5.04-.04,.46,0,.91-.16,1.48-.34,.31-.1,.65-.22,1.06-.33l.48-.13-.39-.31c-.33-.25-.58-.47-.79-.66-.38-.33-.63-.55-.95-.64-1.97-.56-2.39-2.13-2.56-3.74-.08-.79-.08-1.61-.08-2.41v-.41c0-24.42,0-48.85,0-73.27v-.57c0-.57-.01-1.17,.03-1.74,.13-1.8,.79-3.19,1.91-4.04,1.14-.87,2.72-1.14,4.57-.78,3.84,.75,6.52,3.36,7.95,7.73,1.04,3.17,1.79,6.51,2.51,9.73,.32,1.42,.64,2.85,.98,4.26l.89,3.68,1.31-.23v-.21Z"/><path  d="M328.48,51.87c-10.51,.04-21.03,.04-31.54,0-1.9,0-2.63,.86-2.58,2.68,.05,2.07-.02,4.14,.02,6.2,.05,2.41,.3,2.68,2.7,2.7,5.17,.03,10.34,0,15.51,.01,5.17,0,10.34,.02,15.51,0,2.57-.01,2.99-.41,3.07-3,.06-1.98,.01-3.96,0-5.95,0-1.78-.8-2.65-2.69-2.64Z"/></svg>
          <span className="ml-8 scale-y-[1.02] scale-x-[0.65] mb-0 origin-left" style={{ fontFamily: 'Times New Roman' }}>
            {hotdog.id}
          </span>
        </h2>
        <p className={'font-kanji text-5xl mb-12'}>
          {`ホットドッグEX ${hotdog.id}`}
        </p>

        <p className="text-3xl w-3/4 mb-3">
          {hotdog.generated_prompt}
        </p>

        <p className="font-kanji tracking-wider w-3/4">
          {hotdog.generated_kanji}
        </p>
      </article>
    </div>
  )
}