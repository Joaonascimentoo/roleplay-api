import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

/*
{
    "users":{
        "id": number
        "email": string,
        "username": string,
        "password": string,
        "avatar": string
    }   
}
*/

test.group('User', () => {
  test.only('it should create an user', async (assert) => {
    const userPayload = {
      email: 'teste@test.com',
      username: 'test',
      password: 'password',
      avatar: 'http://image.com/image/1',
    }
    const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(201)
    assert.exists(body.user, 'User undefined')
    assert.exists(body.user.id, 'Id undefined')
    assert.equal(body.user.email, userPayload.email)
    assert.equal(body.user.username, userPayload.username)
    assert.notExists(body.user.password, 'Password Defined')
    assert.equal(body.user.avatar, userPayload.avatar)
  })
})
