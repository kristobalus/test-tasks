ATTENTION, PLEASE!!

I want to mention several issues that I found in *task-2*. 

1. First of all in description of task-2 it is said "provided unit test". 
```text
You should complete the given project so that it passes all the test cases 
when running the provided unit tests. The project by default supports the use of the SQLite3 database.
```
Here the test is an *e2e test*, not unit, since you are testing the app as whole.

2. Please fix the errors in "unit test".
Here it is said
```js
 it('should fetch no trades if the type filter value does not exist', async () => {
    await setup(user25_sell_AAC, user24_sell_AAC, user23_sell_AAC, user23_buy_ABX);
    const response = await chai.request(server).get('/trades?type=test')
    response.should.have.status(200);
    response.body.should.eql([]);
})
```
however the allowed types are "buy" and "sell", and actually validation of the filter should
check the type value and return 400 error with a definition of the error ("only buy or sell allowed").
It makes sense since you should not query the database with the wrong filter value. It would be 
waste of CPU and IO resources.

Should be 
```js
response.should.have.status(400);
```
and add the enum in "get-list" json schema like
```json
"type": {
      "description": "The trade type, either 'buy' or 'sell'. (String)",
      "type": "string",
      "enum": ["buy", "sell"]
    },
```

