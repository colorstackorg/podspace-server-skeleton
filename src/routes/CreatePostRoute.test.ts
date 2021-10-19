import { TEST_AUTH_COOKIE, TEST_USER } from '../../jest.setup';
import Post, { PostDocument, PostType } from '../models/Post';
import TestUtils from '../utils/TestUtils';

const TEST_POST_CONTENT = 'I have an update for you all!';

/**
 * TODO: (13.05)
 * - Remove the ".skip" from the following function.
 * - Go to your terminal and run the following command:
 *        npm run test CreatePost
 * - Delete this comment.
 */
describe.skip('POST /posts', () => {
  test('If the user is not authenticated, should return a 401.', async () => {
    await TestUtils.agent
      .post('/posts')
      .send({ content: TEST_POST_CONTENT })
      .expect(401);
  });

  test('If the content is empty, should return a 400.', async () => {
    await TestUtils.agent
      .post('/posts')
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ content: '' })
      .expect(400);
  });

  test('If the type is not a valid PostType, should return a 400.', async () => {
    await TestUtils.agent
      .post('/posts')
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ content: TEST_POST_CONTENT, type: 'INVALID_POST_TYPE' })
      .expect(400);
  });

  test('Should create a post and return a 201.', async () => {
    await TestUtils.agent
      .post('/posts')
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ content: TEST_POST_CONTENT, type: PostType.WIN })
      .expect(201)
      .then(async ({ body }) => {
        const post: PostDocument = await Post.findById(body._id);
        expect(post).not.toBeNull();
        expect(post.content).toBe(TEST_POST_CONTENT);
        expect(post.author.toString()).toBe(TEST_USER._id.toString());
      });
  });
});
