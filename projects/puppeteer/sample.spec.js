describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa • Todo');
    })

    it('should have all uncompleted todo-list', async function() {
      let todoList = await page.waitFor('#todo-list');

      const expectAllchildren = await page.evaluate(todoList => todoList.childNodes, todoList);
      const expectcompleted = await page.evaluate(todoList => todoList.getElementsByClassName('completed'), todoList);
      // 筛选未完成的节点
      m = Object.keys(expectAllchildren).concat(Object.keys(expectcompleted)).filter((v, i, arr)=>arr.indexOf(v) === arr.lastIndexOf(v));
      // 默认还有两项未完成
      expect(m.length).to.eql(2)
    })

    it('should new todo correct', async function() {
      // 点击输入框
      await page.click('#new-todo', {delay: 500});

      //输入内容
      await page.type('#new-todo', 'test todo item', {delay: 50});

      //点击enter
      await page.keyboard.press("Enter");

      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('test todo item');
    }) 

    it('should  completed', async function() {
      let todoList = await page.waitFor('#todo-list');
      const expectbeforeclick = await page.evaluate(todoList => todoList.getElementsByClassName('completed'), todoList);
      // 点击对号,测试第三个任务
      await page.click('#todo-list > li:nth-child(3) > div > input', {delay: 50});

      let todoList1 = await page.waitFor('#todo-list');
      const expectafterclick = await page.evaluate(todoList1 => todoList1.getElementsByClassName('completed'), todoList1);
      len = Object.keys(expectafterclick).length-Object.keys(expectbeforeclick).length
      expect(len).to.eql(1)
    })

  });