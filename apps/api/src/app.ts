import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import authRouter from './routers/auth.router';
import userRouter from './routers/user.router';
import transactionRouter from './routers/transaction.router';
import attendeeRouter from './routers/attendee.router';
import statisticRouter from './routers/statistic.router';
import { EventRouter } from './routers/event.router';
import { DashboardRouter } from './routers/dashboard.router';
import { ReviewRouter } from './routers/review.router';
import cron from './jobs/cleanupExpiredData';
import { accessValidation } from './middlewares/accessValidation';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    cron;
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const eventRouter = new EventRouter();
    const dashboardRouter = new DashboardRouter();
    const reviewRouter = new ReviewRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/auth', authRouter);
    this.app.use('/api/transaction', accessValidation, transactionRouter);
    this.app.use('/api/user', accessValidation, userRouter);
    this.app.use('/api/attendee', accessValidation, attendeeRouter);
    this.app.use('/api/statistic', accessValidation, statisticRouter);
    this.app.use('/api/events', eventRouter.getRouter());
    this.app.use('/api/review', reviewRouter.getRouter());
    this.app.use('/api/event-management', dashboardRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
