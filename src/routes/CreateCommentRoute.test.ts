import { TEST_AUTH_COOKIE, TEST_USER } from '../../jest.setup';
import Comment from '../models/Comment';
import Post, { PostDocument } from '../models/Post';
import TestUtils from '../utils/TestUtils';

const TEST_COMMENT_CONTENT = 'So proud of you all!';

/**
 * TODO: (18.04)
 * - Remove the ".skip" from the following function.
 * - Go to your terminal and run the following command:
 *        npm run test CreateComment
 * - Delete this comment.
 */
describe.skip('POST /posts/:id/comments', () => {
  let post: PostDocument = null;

  beforeAll(async () => {
    post = await Post.create({
      author: TEST_USER._id,
      content: 'Hello World!'
    });
  });

  test('If the user is not authenticated, should return a 401.', async () => {
    await TestUtils.agent
      .post(`/posts/${post._id}/comments`)
      .send({ content: TEST_COMMENT_CONTENT })
      .expect(401);
  });

  test('If the content is empty, should return a 400.', async () => {
    await TestUtils.agent
      .post(`/posts/${post._id}/comments`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ content: '' })
      .expect(400);
  });

  test('If the given post ID is not valid, should return a 400.', async () => {
    await TestUtils.agent
      .post('/posts/12345/comments')
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ content: TEST_COMMENT_CONTENT })
      .expect(400);
  });

  test('If there is no post found with the given ID, should return a 404.', async () => {
    await TestUtils.agent
      .post(`/posts/${TestUtils.NOT_FOUND_ID}/comments`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ content: TEST_COMMENT_CONTENT })
      .expect(404);
  });

  test('Should create a comment on the given post and return a 201.', async () => {
    await TestUtils.agent
      .post(`/posts/${post._id}/comments`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ content: TEST_COMMENT_CONTENT })
      .expect(201)
      .then(async ({ body }) => {
        const comment = await Comment.findById(body._id);
        expect(comment).not.toBeNull();
        expect(comment.content).toBe(TEST_COMMENT_CONTENT);
      });
  });
});
