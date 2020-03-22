const {
  app
} = require('../src/app');
const {
  asyncReadFile,
  asyncWriteFile
} = require('../src/dao')
const request = require('supertest');

describe("app", () => {
  describe("get request", () => {
    it("should get all tasks when request url pattern is '/tasks'", (done) => {
      app.locals.dataFilePath = "./test/fixture.json"
      request(app).get('/tasks').expect(200).expect([{
          id: "1",
          content: "Restful API homework",
          createdTime: "2019-05-15T00:00:00Z"
        },
        {
          id: "2",
          content: "Text Classification",
          createdTime: "2019-05-18T00:00:00Z"
        }
      ]).end((err, res) => {
        if (err) throw err;
        done()
      })
    })

    it("should get specific task when request url patten is '/tasks/:id'", (done) => {
      request(app).get('/tasks/1').expect(200).expect({
        id: "1",
        content: "Restful API homework",
        createdTime: "2019-05-15T00:00:00Z"
      }).end((err, res) => {
        if (err) throw err;
        done()
      })
    })

    it("should not get specific task when request url patten is '/tasks/:id' and the corresponding id does not exist in the datasource", (done) => {
      request(app).get('/tasks/3').expect(404).end((err, res) => {
        if (err) throw err;
        done()
      })
    })

  })

  describe("post request", () => {
    afterEach(async function () {
      await asyncWriteFile(JSON.stringify([{
        id: "1",
        content: "Restful API homework",
        createdTime: "2019-05-15T00:00:00Z"
      },
      {
        id: "2",
        content: "Text Classification",
        createdTime: "2019-05-18T00:00:00Z"
      }
      ]), "./test/fixture.json")
    })
    it("should create a task when the corresponding id does not exist in the datasource", (done) => {
      request(app).post('/tasks').send({
        id: "3",
        content:"paper reading",
        createdTime:"2019-09-10T10:00:00Z"
      }).expect(201).expect([
        {
            id: "1",
            content: "Restful API homework",
            createdTime: "2019-05-15T00:00:00Z"
        },
        {
            id: "2",
            content: "Text Classification",
            createdTime: "2019-05-18T00:00:00Z"
        },
        {
            id: "3",
            content: "paper reading",
            createdTime: "2019-09-10T10:00:00Z"
        }
    ]).end((err, res) => {
        if (err) throw err;
        done()
      })
    })

    it("should not create the task when its id has already existed in the datasource", (done) => {
      request(app).post('/tasks').send({
        id: "1",
        content: "Restful API homework",
        createdTime: "2019-05-15T00:00:00Z"
      }).expect(400).end((err, res) => {
        if (err) throw err;
        done()
      })
    })
  })

  describe("put request", () => {
    afterEach(async function () {
      await asyncWriteFile(JSON.stringify([{
        id: "1",
        content: "Restful API homework",
        createdTime: "2019-05-15T00:00:00Z"
      },
      {
        id: "2",
        content: "Text Classification",
        createdTime: "2019-05-18T00:00:00Z"
      }
      ]), "./test/fixture.json")
    })
    it("should create a task when the corresponding id does not exist in the datasource", (done) => {
      request(app).put('/tasks').send({
        id: "3",
        content: "paper reading",
        createdTime: "2019-09-10T10:00:00Z"
      }).expect(201).expect([{
        id: "1",
        content: "Restful API homework",
        createdTime: "2019-05-15T00:00:00Z"
    },
    {
        id: "2",
        content: "Text Classification",
        createdTime: "2019-05-18T00:00:00Z"
    },
    {
        id: "3",
        content: "paper reading",
        createdTime: "2019-09-10T10:00:00Z"
    }
      ]).end((err, res) => {
        if (err) throw err;
        done()
      })
    })

    it("should update the task when its id has already existed in the datasource", (done) => {
      request(app).put('/tasks').send({
        id: "1",
        content: "paper reading",
        createdTime: "2019-05-15T00:00:00Z"
      }).expect(200).expect([{
        id: "1",
        content: "paper reading",
        createdTime: "2019-05-15T00:00:00Z"
      },
      {
        id: "2",
        content: "Text Classification",
        createdTime: "2019-05-18T00:00:00Z"
      }
    ]).end((err, res) => {
      if (err) throw err;
      done()
      })
    })

    describe("delete request", () => {
      afterEach(async function () {
        await asyncWriteFile(JSON.stringify([{
          id: "1",
          content: "Restful API homework",
          createdTime: "2019-05-15T00:00:00Z"
        },
        {
          id: "2",
          content: "Text Classification",
          createdTime: "2019-05-18T00:00:00Z"
        }
        ]), "./test/fixture.json")

      })
      it("should delete specific task when request url patten is '/tasks/:id'", (done) => {
        request(app).delete('/tasks/1').expect(204).end((err, res) => {
          if (err) throw err;
          done()
        })
      })
      it("should not delete specific task when request url patten is '/tasks/:id' and the corresponding id does not exist in the datasource", (done) => {
        request(app).delete('/tasks/3').expect(404).end((err, res) => {
          if (err) throw err;
          done()
        })
      })

    })
  })
})
