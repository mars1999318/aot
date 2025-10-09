import React from 'react'

export function SimpleTest() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ArriveOnTime 测试页面</h1>
      <p>如果您能看到这行中文，说明编码问题已解决！</p>
      <p>If you can see this English text, the encoding is working!</p>
      <div style={{ marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', margin: '5px' }}>测试按钮</button>
        <button style={{ padding: '10px 20px', margin: '5px' }}>Test Button</button>
      </div>
    </div>
  )
}
