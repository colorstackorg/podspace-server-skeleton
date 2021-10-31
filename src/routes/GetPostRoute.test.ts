import { TEST_AUTH_COOKIE, TEST_USER } from '../../jest.setup';
import Post, { PostDocument } from '../models/Post';
import TestUtils from '../utils/TestUtils';

describe('GET /posts/:id', () => {
  let post: PostDocument = null;

  beforeAll(async () => {
    post = await Post.create({
      author: TEST_USER._id,
      content: 'Hello World!'
    });
  });

  test('If the user is not authenticated, should return a 401.', async () => {
    await TestUtils.agent.get(`/posts/${post._id}`).expect(401);
  });

  test('If the given post ID is not valid, should return a 400.', async () => {
    await TestUtils.agent
      .get(`/posts/${TestUtils.INVALID_ID}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(400);
  });

  test('If there is no post found with the given ID, should return a 404.', async () => {
    await TestUtils.agent
      .get(`/posts/${TestUtils.NOT_FOUND_ID}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(404);
  });

  test('If there IS a post found with the given ID, should return a 200.', async () => {
    await TestUtils.agent
      .get(`/posts/${post._id}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(200)
      .then(({ body }) => {
        expect(body).not.toBeNull();
        expect(body._id.toString()).toBe(post._id.toString());
        expect(body.content).toBe(post.content);
      });
  });
});
