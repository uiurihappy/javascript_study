function els(selector, context) {
    // selector 유형이 문자가 아니거나, selector 공백을 제거한 길이가 0일 경우 결과 값 null 반환
    if (typeof selector !== 'string' || selector.trim().length === 0) { return null; }
    // context 값이 존재하고, 노드 유형이 요소 노드(1)가 아니라면... context 변수에 el() 함수를 통해 문서 객체 참조.
    if (context && context.nodeType !== document.ELEMENT_NODE) { context = el(String(context)); }
    // context 값이 undefined, null 일 경우, context는 document 값을 참조.
    if (!context) { context = document; }
    return context.querySelectorAll(selector);
  }
  
  function el(selector, context) {
    if (typeof selector !== 'string' || selector.trim().length === 0) { return null; }
    if (context && context.nodeType !== document.ELEMENT_NODE) { context = el(String(context)); }
    if (!context) { context = document; }
    return context.querySelector(selector);
  }