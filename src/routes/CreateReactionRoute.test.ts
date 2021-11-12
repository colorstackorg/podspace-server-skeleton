import { TEST_AUTH_COOKIE, TEST_USER } from '../../jest.setup';
import Post, { PostDocument } from '../models/Post';
import Reaction, { ReactionDocument, ReactionType } from '../models/Reaction';
import TestUtils from '../utils/TestUtils';

/**
 * TODO: (16.04)
 * - Remove the ".skip" from the following function.
 * - Go to your terminal and run the following command:
 *        npm run test CreateReaction
 * - Delete this comment.
 */
describe('POST /posts/:id/reactions', () => {
  let post: PostDocument = null;

  beforeAll(async () => {
    post = await Post.create({
      author: TEST_USER._id,
      content: 'Hello World!'
    });
  });

  test('If the user is not authenticated, should return a 401.', async () => {
    await TestUtils.agent
      .post(`/posts/${post._id}/reactions`)
      .send({ type: ReactionType.HEART })
      .expect(401);
  });

  test('If the type is not a valid ReactionType, should return a 400.', async () => {
    await TestUtils.agent
      .post(`/posts/${post._id}/reactions`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ type: 'INVALID_REACTION_TYPE' })
      .expect(400);
  });

  test('If the given post ID is not valid, should return a 400.', async () => {
    await TestUtils.agent
      .post(`/posts/${TestUtils.INVALID_ID}/reactions`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ type: ReactionType.HEART })
      .expect(400);
  });

  test('If there is no post found with the given ID, should return a 404.', async () => {
    await TestUtils.agent
      .post(`/posts/${TestUtils.NOT_FOUND_ID}/reactions`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ type: ReactionType.HEART })
      .expect(404);
  });

  test('Should create a reaction on the given post and return a 201.', async () => {
    await TestUtils.agent
      .post(`/posts/${post._id}/reactions`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .send({ type: ReactionType.HEART })
      .expect(201)
      .then(async ({ body }) => {
        const reaction: ReactionDocument = await Reaction.findById(body._id);
        expect(reaction).not.toBeNull();
        expect(reaction.type).toBe(ReactionType.HEART);
      });
  });
});
