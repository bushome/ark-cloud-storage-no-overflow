
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Cluster
 * 
 */
export type Cluster = $Result.DefaultSelection<Prisma.$ClusterPayload>
/**
 * Model DedicatedStorage
 * 
 */
export type DedicatedStorage = $Result.DefaultSelection<Prisma.$DedicatedStoragePayload>
/**
 * Model DeductionAuditLog
 * 
 */
export type DeductionAuditLog = $Result.DefaultSelection<Prisma.$DeductionAuditLogPayload>
/**
 * Model ResourceRateCeiling
 * 
 */
export type ResourceRateCeiling = $Result.DefaultSelection<Prisma.$ResourceRateCeilingPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clusters
 * const clusters = await prisma.cluster.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Clusters
   * const clusters = await prisma.cluster.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cluster`: Exposes CRUD operations for the **Cluster** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clusters
    * const clusters = await prisma.cluster.findMany()
    * ```
    */
  get cluster(): Prisma.ClusterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dedicatedStorage`: Exposes CRUD operations for the **DedicatedStorage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DedicatedStorages
    * const dedicatedStorages = await prisma.dedicatedStorage.findMany()
    * ```
    */
  get dedicatedStorage(): Prisma.DedicatedStorageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deductionAuditLog`: Exposes CRUD operations for the **DeductionAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeductionAuditLogs
    * const deductionAuditLogs = await prisma.deductionAuditLog.findMany()
    * ```
    */
  get deductionAuditLog(): Prisma.DeductionAuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resourceRateCeiling`: Exposes CRUD operations for the **ResourceRateCeiling** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResourceRateCeilings
    * const resourceRateCeilings = await prisma.resourceRateCeiling.findMany()
    * ```
    */
  get resourceRateCeiling(): Prisma.ResourceRateCeilingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Cluster: 'Cluster',
    DedicatedStorage: 'DedicatedStorage',
    DeductionAuditLog: 'DeductionAuditLog',
    ResourceRateCeiling: 'ResourceRateCeiling'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cluster" | "dedicatedStorage" | "deductionAuditLog" | "resourceRateCeiling"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Cluster: {
        payload: Prisma.$ClusterPayload<ExtArgs>
        fields: Prisma.ClusterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClusterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClusterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          findFirst: {
            args: Prisma.ClusterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClusterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          findMany: {
            args: Prisma.ClusterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>[]
          }
          create: {
            args: Prisma.ClusterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          createMany: {
            args: Prisma.ClusterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClusterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>[]
          }
          delete: {
            args: Prisma.ClusterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          update: {
            args: Prisma.ClusterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          deleteMany: {
            args: Prisma.ClusterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClusterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClusterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>[]
          }
          upsert: {
            args: Prisma.ClusterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClusterPayload>
          }
          aggregate: {
            args: Prisma.ClusterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCluster>
          }
          groupBy: {
            args: Prisma.ClusterGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClusterGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClusterCountArgs<ExtArgs>
            result: $Utils.Optional<ClusterCountAggregateOutputType> | number
          }
        }
      }
      DedicatedStorage: {
        payload: Prisma.$DedicatedStoragePayload<ExtArgs>
        fields: Prisma.DedicatedStorageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DedicatedStorageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DedicatedStorageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload>
          }
          findFirst: {
            args: Prisma.DedicatedStorageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DedicatedStorageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload>
          }
          findMany: {
            args: Prisma.DedicatedStorageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload>[]
          }
          create: {
            args: Prisma.DedicatedStorageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload>
          }
          createMany: {
            args: Prisma.DedicatedStorageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DedicatedStorageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload>[]
          }
          delete: {
            args: Prisma.DedicatedStorageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload>
          }
          update: {
            args: Prisma.DedicatedStorageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload>
          }
          deleteMany: {
            args: Prisma.DedicatedStorageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DedicatedStorageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DedicatedStorageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload>[]
          }
          upsert: {
            args: Prisma.DedicatedStorageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DedicatedStoragePayload>
          }
          aggregate: {
            args: Prisma.DedicatedStorageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDedicatedStorage>
          }
          groupBy: {
            args: Prisma.DedicatedStorageGroupByArgs<ExtArgs>
            result: $Utils.Optional<DedicatedStorageGroupByOutputType>[]
          }
          count: {
            args: Prisma.DedicatedStorageCountArgs<ExtArgs>
            result: $Utils.Optional<DedicatedStorageCountAggregateOutputType> | number
          }
        }
      }
      DeductionAuditLog: {
        payload: Prisma.$DeductionAuditLogPayload<ExtArgs>
        fields: Prisma.DeductionAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeductionAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeductionAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload>
          }
          findFirst: {
            args: Prisma.DeductionAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeductionAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload>
          }
          findMany: {
            args: Prisma.DeductionAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload>[]
          }
          create: {
            args: Prisma.DeductionAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload>
          }
          createMany: {
            args: Prisma.DeductionAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeductionAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload>[]
          }
          delete: {
            args: Prisma.DeductionAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload>
          }
          update: {
            args: Prisma.DeductionAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.DeductionAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeductionAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeductionAuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload>[]
          }
          upsert: {
            args: Prisma.DeductionAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeductionAuditLogPayload>
          }
          aggregate: {
            args: Prisma.DeductionAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeductionAuditLog>
          }
          groupBy: {
            args: Prisma.DeductionAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeductionAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeductionAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<DeductionAuditLogCountAggregateOutputType> | number
          }
        }
      }
      ResourceRateCeiling: {
        payload: Prisma.$ResourceRateCeilingPayload<ExtArgs>
        fields: Prisma.ResourceRateCeilingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceRateCeilingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceRateCeilingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload>
          }
          findFirst: {
            args: Prisma.ResourceRateCeilingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceRateCeilingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload>
          }
          findMany: {
            args: Prisma.ResourceRateCeilingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload>[]
          }
          create: {
            args: Prisma.ResourceRateCeilingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload>
          }
          createMany: {
            args: Prisma.ResourceRateCeilingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceRateCeilingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload>[]
          }
          delete: {
            args: Prisma.ResourceRateCeilingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload>
          }
          update: {
            args: Prisma.ResourceRateCeilingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload>
          }
          deleteMany: {
            args: Prisma.ResourceRateCeilingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceRateCeilingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceRateCeilingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload>[]
          }
          upsert: {
            args: Prisma.ResourceRateCeilingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRateCeilingPayload>
          }
          aggregate: {
            args: Prisma.ResourceRateCeilingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResourceRateCeiling>
          }
          groupBy: {
            args: Prisma.ResourceRateCeilingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceRateCeilingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceRateCeilingCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceRateCeilingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cluster?: ClusterOmit
    dedicatedStorage?: DedicatedStorageOmit
    deductionAuditLog?: DeductionAuditLogOmit
    resourceRateCeiling?: ResourceRateCeilingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Cluster
   */

  export type AggregateCluster = {
    _count: ClusterCountAggregateOutputType | null
    _min: ClusterMinAggregateOutputType | null
    _max: ClusterMaxAggregateOutputType | null
  }

  export type ClusterMinAggregateOutputType = {
    id: string | null
    secret: string | null
  }

  export type ClusterMaxAggregateOutputType = {
    id: string | null
    secret: string | null
  }

  export type ClusterCountAggregateOutputType = {
    id: number
    secret: number
    _all: number
  }


  export type ClusterMinAggregateInputType = {
    id?: true
    secret?: true
  }

  export type ClusterMaxAggregateInputType = {
    id?: true
    secret?: true
  }

  export type ClusterCountAggregateInputType = {
    id?: true
    secret?: true
    _all?: true
  }

  export type ClusterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cluster to aggregate.
     */
    where?: ClusterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clusters to fetch.
     */
    orderBy?: ClusterOrderByWithRelationInput | ClusterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClusterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clusters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clusters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clusters
    **/
    _count?: true | ClusterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClusterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClusterMaxAggregateInputType
  }

  export type GetClusterAggregateType<T extends ClusterAggregateArgs> = {
        [P in keyof T & keyof AggregateCluster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCluster[P]>
      : GetScalarType<T[P], AggregateCluster[P]>
  }




  export type ClusterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClusterWhereInput
    orderBy?: ClusterOrderByWithAggregationInput | ClusterOrderByWithAggregationInput[]
    by: ClusterScalarFieldEnum[] | ClusterScalarFieldEnum
    having?: ClusterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClusterCountAggregateInputType | true
    _min?: ClusterMinAggregateInputType
    _max?: ClusterMaxAggregateInputType
  }

  export type ClusterGroupByOutputType = {
    id: string
    secret: string
    _count: ClusterCountAggregateOutputType | null
    _min: ClusterMinAggregateOutputType | null
    _max: ClusterMaxAggregateOutputType | null
  }

  type GetClusterGroupByPayload<T extends ClusterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClusterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClusterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClusterGroupByOutputType[P]>
            : GetScalarType<T[P], ClusterGroupByOutputType[P]>
        }
      >
    >


  export type ClusterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    secret?: boolean
  }, ExtArgs["result"]["cluster"]>

  export type ClusterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    secret?: boolean
  }, ExtArgs["result"]["cluster"]>

  export type ClusterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    secret?: boolean
  }, ExtArgs["result"]["cluster"]>

  export type ClusterSelectScalar = {
    id?: boolean
    secret?: boolean
  }

  export type ClusterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "secret", ExtArgs["result"]["cluster"]>

  export type $ClusterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cluster"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      secret: string
    }, ExtArgs["result"]["cluster"]>
    composites: {}
  }

  type ClusterGetPayload<S extends boolean | null | undefined | ClusterDefaultArgs> = $Result.GetResult<Prisma.$ClusterPayload, S>

  type ClusterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClusterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClusterCountAggregateInputType | true
    }

  export interface ClusterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cluster'], meta: { name: 'Cluster' } }
    /**
     * Find zero or one Cluster that matches the filter.
     * @param {ClusterFindUniqueArgs} args - Arguments to find a Cluster
     * @example
     * // Get one Cluster
     * const cluster = await prisma.cluster.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClusterFindUniqueArgs>(args: SelectSubset<T, ClusterFindUniqueArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cluster that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClusterFindUniqueOrThrowArgs} args - Arguments to find a Cluster
     * @example
     * // Get one Cluster
     * const cluster = await prisma.cluster.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClusterFindUniqueOrThrowArgs>(args: SelectSubset<T, ClusterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cluster that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterFindFirstArgs} args - Arguments to find a Cluster
     * @example
     * // Get one Cluster
     * const cluster = await prisma.cluster.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClusterFindFirstArgs>(args?: SelectSubset<T, ClusterFindFirstArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cluster that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterFindFirstOrThrowArgs} args - Arguments to find a Cluster
     * @example
     * // Get one Cluster
     * const cluster = await prisma.cluster.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClusterFindFirstOrThrowArgs>(args?: SelectSubset<T, ClusterFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clusters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clusters
     * const clusters = await prisma.cluster.findMany()
     * 
     * // Get first 10 Clusters
     * const clusters = await prisma.cluster.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clusterWithIdOnly = await prisma.cluster.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClusterFindManyArgs>(args?: SelectSubset<T, ClusterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cluster.
     * @param {ClusterCreateArgs} args - Arguments to create a Cluster.
     * @example
     * // Create one Cluster
     * const Cluster = await prisma.cluster.create({
     *   data: {
     *     // ... data to create a Cluster
     *   }
     * })
     * 
     */
    create<T extends ClusterCreateArgs>(args: SelectSubset<T, ClusterCreateArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clusters.
     * @param {ClusterCreateManyArgs} args - Arguments to create many Clusters.
     * @example
     * // Create many Clusters
     * const cluster = await prisma.cluster.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClusterCreateManyArgs>(args?: SelectSubset<T, ClusterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clusters and returns the data saved in the database.
     * @param {ClusterCreateManyAndReturnArgs} args - Arguments to create many Clusters.
     * @example
     * // Create many Clusters
     * const cluster = await prisma.cluster.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clusters and only return the `id`
     * const clusterWithIdOnly = await prisma.cluster.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClusterCreateManyAndReturnArgs>(args?: SelectSubset<T, ClusterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cluster.
     * @param {ClusterDeleteArgs} args - Arguments to delete one Cluster.
     * @example
     * // Delete one Cluster
     * const Cluster = await prisma.cluster.delete({
     *   where: {
     *     // ... filter to delete one Cluster
     *   }
     * })
     * 
     */
    delete<T extends ClusterDeleteArgs>(args: SelectSubset<T, ClusterDeleteArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cluster.
     * @param {ClusterUpdateArgs} args - Arguments to update one Cluster.
     * @example
     * // Update one Cluster
     * const cluster = await prisma.cluster.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClusterUpdateArgs>(args: SelectSubset<T, ClusterUpdateArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clusters.
     * @param {ClusterDeleteManyArgs} args - Arguments to filter Clusters to delete.
     * @example
     * // Delete a few Clusters
     * const { count } = await prisma.cluster.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClusterDeleteManyArgs>(args?: SelectSubset<T, ClusterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clusters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clusters
     * const cluster = await prisma.cluster.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClusterUpdateManyArgs>(args: SelectSubset<T, ClusterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clusters and returns the data updated in the database.
     * @param {ClusterUpdateManyAndReturnArgs} args - Arguments to update many Clusters.
     * @example
     * // Update many Clusters
     * const cluster = await prisma.cluster.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clusters and only return the `id`
     * const clusterWithIdOnly = await prisma.cluster.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClusterUpdateManyAndReturnArgs>(args: SelectSubset<T, ClusterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cluster.
     * @param {ClusterUpsertArgs} args - Arguments to update or create a Cluster.
     * @example
     * // Update or create a Cluster
     * const cluster = await prisma.cluster.upsert({
     *   create: {
     *     // ... data to create a Cluster
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cluster we want to update
     *   }
     * })
     */
    upsert<T extends ClusterUpsertArgs>(args: SelectSubset<T, ClusterUpsertArgs<ExtArgs>>): Prisma__ClusterClient<$Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clusters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterCountArgs} args - Arguments to filter Clusters to count.
     * @example
     * // Count the number of Clusters
     * const count = await prisma.cluster.count({
     *   where: {
     *     // ... the filter for the Clusters we want to count
     *   }
     * })
    **/
    count<T extends ClusterCountArgs>(
      args?: Subset<T, ClusterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClusterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cluster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClusterAggregateArgs>(args: Subset<T, ClusterAggregateArgs>): Prisma.PrismaPromise<GetClusterAggregateType<T>>

    /**
     * Group by Cluster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClusterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClusterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClusterGroupByArgs['orderBy'] }
        : { orderBy?: ClusterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClusterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClusterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cluster model
   */
  readonly fields: ClusterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cluster.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClusterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cluster model
   */
  interface ClusterFieldRefs {
    readonly id: FieldRef<"Cluster", 'String'>
    readonly secret: FieldRef<"Cluster", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Cluster findUnique
   */
  export type ClusterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * Filter, which Cluster to fetch.
     */
    where: ClusterWhereUniqueInput
  }

  /**
   * Cluster findUniqueOrThrow
   */
  export type ClusterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * Filter, which Cluster to fetch.
     */
    where: ClusterWhereUniqueInput
  }

  /**
   * Cluster findFirst
   */
  export type ClusterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * Filter, which Cluster to fetch.
     */
    where?: ClusterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clusters to fetch.
     */
    orderBy?: ClusterOrderByWithRelationInput | ClusterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clusters.
     */
    cursor?: ClusterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clusters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clusters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clusters.
     */
    distinct?: ClusterScalarFieldEnum | ClusterScalarFieldEnum[]
  }

  /**
   * Cluster findFirstOrThrow
   */
  export type ClusterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * Filter, which Cluster to fetch.
     */
    where?: ClusterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clusters to fetch.
     */
    orderBy?: ClusterOrderByWithRelationInput | ClusterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clusters.
     */
    cursor?: ClusterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clusters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clusters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clusters.
     */
    distinct?: ClusterScalarFieldEnum | ClusterScalarFieldEnum[]
  }

  /**
   * Cluster findMany
   */
  export type ClusterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * Filter, which Clusters to fetch.
     */
    where?: ClusterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clusters to fetch.
     */
    orderBy?: ClusterOrderByWithRelationInput | ClusterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clusters.
     */
    cursor?: ClusterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clusters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clusters.
     */
    skip?: number
    distinct?: ClusterScalarFieldEnum | ClusterScalarFieldEnum[]
  }

  /**
   * Cluster create
   */
  export type ClusterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * The data needed to create a Cluster.
     */
    data: XOR<ClusterCreateInput, ClusterUncheckedCreateInput>
  }

  /**
   * Cluster createMany
   */
  export type ClusterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clusters.
     */
    data: ClusterCreateManyInput | ClusterCreateManyInput[]
  }

  /**
   * Cluster createManyAndReturn
   */
  export type ClusterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * The data used to create many Clusters.
     */
    data: ClusterCreateManyInput | ClusterCreateManyInput[]
  }

  /**
   * Cluster update
   */
  export type ClusterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * The data needed to update a Cluster.
     */
    data: XOR<ClusterUpdateInput, ClusterUncheckedUpdateInput>
    /**
     * Choose, which Cluster to update.
     */
    where: ClusterWhereUniqueInput
  }

  /**
   * Cluster updateMany
   */
  export type ClusterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clusters.
     */
    data: XOR<ClusterUpdateManyMutationInput, ClusterUncheckedUpdateManyInput>
    /**
     * Filter which Clusters to update
     */
    where?: ClusterWhereInput
    /**
     * Limit how many Clusters to update.
     */
    limit?: number
  }

  /**
   * Cluster updateManyAndReturn
   */
  export type ClusterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * The data used to update Clusters.
     */
    data: XOR<ClusterUpdateManyMutationInput, ClusterUncheckedUpdateManyInput>
    /**
     * Filter which Clusters to update
     */
    where?: ClusterWhereInput
    /**
     * Limit how many Clusters to update.
     */
    limit?: number
  }

  /**
   * Cluster upsert
   */
  export type ClusterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * The filter to search for the Cluster to update in case it exists.
     */
    where: ClusterWhereUniqueInput
    /**
     * In case the Cluster found by the `where` argument doesn't exist, create a new Cluster with this data.
     */
    create: XOR<ClusterCreateInput, ClusterUncheckedCreateInput>
    /**
     * In case the Cluster was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClusterUpdateInput, ClusterUncheckedUpdateInput>
  }

  /**
   * Cluster delete
   */
  export type ClusterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
    /**
     * Filter which Cluster to delete.
     */
    where: ClusterWhereUniqueInput
  }

  /**
   * Cluster deleteMany
   */
  export type ClusterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clusters to delete
     */
    where?: ClusterWhereInput
    /**
     * Limit how many Clusters to delete.
     */
    limit?: number
  }

  /**
   * Cluster without action
   */
  export type ClusterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cluster
     */
    select?: ClusterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cluster
     */
    omit?: ClusterOmit<ExtArgs> | null
  }


  /**
   * Model DedicatedStorage
   */

  export type AggregateDedicatedStorage = {
    _count: DedicatedStorageCountAggregateOutputType | null
    _avg: DedicatedStorageAvgAggregateOutputType | null
    _sum: DedicatedStorageSumAggregateOutputType | null
    _min: DedicatedStorageMinAggregateOutputType | null
    _max: DedicatedStorageMaxAggregateOutputType | null
  }

  export type DedicatedStorageAvgAggregateOutputType = {
    ownerId: number | null
    amount: number | null
  }

  export type DedicatedStorageSumAggregateOutputType = {
    ownerId: number | null
    amount: number | null
  }

  export type DedicatedStorageMinAggregateOutputType = {
    resourceId: string | null
    clusterId: string | null
    ownerId: number | null
    amount: number | null
  }

  export type DedicatedStorageMaxAggregateOutputType = {
    resourceId: string | null
    clusterId: string | null
    ownerId: number | null
    amount: number | null
  }

  export type DedicatedStorageCountAggregateOutputType = {
    resourceId: number
    clusterId: number
    ownerId: number
    amount: number
    _all: number
  }


  export type DedicatedStorageAvgAggregateInputType = {
    ownerId?: true
    amount?: true
  }

  export type DedicatedStorageSumAggregateInputType = {
    ownerId?: true
    amount?: true
  }

  export type DedicatedStorageMinAggregateInputType = {
    resourceId?: true
    clusterId?: true
    ownerId?: true
    amount?: true
  }

  export type DedicatedStorageMaxAggregateInputType = {
    resourceId?: true
    clusterId?: true
    ownerId?: true
    amount?: true
  }

  export type DedicatedStorageCountAggregateInputType = {
    resourceId?: true
    clusterId?: true
    ownerId?: true
    amount?: true
    _all?: true
  }

  export type DedicatedStorageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DedicatedStorage to aggregate.
     */
    where?: DedicatedStorageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DedicatedStorages to fetch.
     */
    orderBy?: DedicatedStorageOrderByWithRelationInput | DedicatedStorageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DedicatedStorageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DedicatedStorages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DedicatedStorages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DedicatedStorages
    **/
    _count?: true | DedicatedStorageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DedicatedStorageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DedicatedStorageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DedicatedStorageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DedicatedStorageMaxAggregateInputType
  }

  export type GetDedicatedStorageAggregateType<T extends DedicatedStorageAggregateArgs> = {
        [P in keyof T & keyof AggregateDedicatedStorage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDedicatedStorage[P]>
      : GetScalarType<T[P], AggregateDedicatedStorage[P]>
  }




  export type DedicatedStorageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DedicatedStorageWhereInput
    orderBy?: DedicatedStorageOrderByWithAggregationInput | DedicatedStorageOrderByWithAggregationInput[]
    by: DedicatedStorageScalarFieldEnum[] | DedicatedStorageScalarFieldEnum
    having?: DedicatedStorageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DedicatedStorageCountAggregateInputType | true
    _avg?: DedicatedStorageAvgAggregateInputType
    _sum?: DedicatedStorageSumAggregateInputType
    _min?: DedicatedStorageMinAggregateInputType
    _max?: DedicatedStorageMaxAggregateInputType
  }

  export type DedicatedStorageGroupByOutputType = {
    resourceId: string
    clusterId: string
    ownerId: number
    amount: number
    _count: DedicatedStorageCountAggregateOutputType | null
    _avg: DedicatedStorageAvgAggregateOutputType | null
    _sum: DedicatedStorageSumAggregateOutputType | null
    _min: DedicatedStorageMinAggregateOutputType | null
    _max: DedicatedStorageMaxAggregateOutputType | null
  }

  type GetDedicatedStorageGroupByPayload<T extends DedicatedStorageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DedicatedStorageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DedicatedStorageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DedicatedStorageGroupByOutputType[P]>
            : GetScalarType<T[P], DedicatedStorageGroupByOutputType[P]>
        }
      >
    >


  export type DedicatedStorageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    resourceId?: boolean
    clusterId?: boolean
    ownerId?: boolean
    amount?: boolean
  }, ExtArgs["result"]["dedicatedStorage"]>

  export type DedicatedStorageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    resourceId?: boolean
    clusterId?: boolean
    ownerId?: boolean
    amount?: boolean
  }, ExtArgs["result"]["dedicatedStorage"]>

  export type DedicatedStorageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    resourceId?: boolean
    clusterId?: boolean
    ownerId?: boolean
    amount?: boolean
  }, ExtArgs["result"]["dedicatedStorage"]>

  export type DedicatedStorageSelectScalar = {
    resourceId?: boolean
    clusterId?: boolean
    ownerId?: boolean
    amount?: boolean
  }

  export type DedicatedStorageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"resourceId" | "clusterId" | "ownerId" | "amount", ExtArgs["result"]["dedicatedStorage"]>

  export type $DedicatedStoragePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DedicatedStorage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      resourceId: string
      clusterId: string
      ownerId: number
      amount: number
    }, ExtArgs["result"]["dedicatedStorage"]>
    composites: {}
  }

  type DedicatedStorageGetPayload<S extends boolean | null | undefined | DedicatedStorageDefaultArgs> = $Result.GetResult<Prisma.$DedicatedStoragePayload, S>

  type DedicatedStorageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DedicatedStorageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DedicatedStorageCountAggregateInputType | true
    }

  export interface DedicatedStorageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DedicatedStorage'], meta: { name: 'DedicatedStorage' } }
    /**
     * Find zero or one DedicatedStorage that matches the filter.
     * @param {DedicatedStorageFindUniqueArgs} args - Arguments to find a DedicatedStorage
     * @example
     * // Get one DedicatedStorage
     * const dedicatedStorage = await prisma.dedicatedStorage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DedicatedStorageFindUniqueArgs>(args: SelectSubset<T, DedicatedStorageFindUniqueArgs<ExtArgs>>): Prisma__DedicatedStorageClient<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DedicatedStorage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DedicatedStorageFindUniqueOrThrowArgs} args - Arguments to find a DedicatedStorage
     * @example
     * // Get one DedicatedStorage
     * const dedicatedStorage = await prisma.dedicatedStorage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DedicatedStorageFindUniqueOrThrowArgs>(args: SelectSubset<T, DedicatedStorageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DedicatedStorageClient<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DedicatedStorage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DedicatedStorageFindFirstArgs} args - Arguments to find a DedicatedStorage
     * @example
     * // Get one DedicatedStorage
     * const dedicatedStorage = await prisma.dedicatedStorage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DedicatedStorageFindFirstArgs>(args?: SelectSubset<T, DedicatedStorageFindFirstArgs<ExtArgs>>): Prisma__DedicatedStorageClient<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DedicatedStorage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DedicatedStorageFindFirstOrThrowArgs} args - Arguments to find a DedicatedStorage
     * @example
     * // Get one DedicatedStorage
     * const dedicatedStorage = await prisma.dedicatedStorage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DedicatedStorageFindFirstOrThrowArgs>(args?: SelectSubset<T, DedicatedStorageFindFirstOrThrowArgs<ExtArgs>>): Prisma__DedicatedStorageClient<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DedicatedStorages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DedicatedStorageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DedicatedStorages
     * const dedicatedStorages = await prisma.dedicatedStorage.findMany()
     * 
     * // Get first 10 DedicatedStorages
     * const dedicatedStorages = await prisma.dedicatedStorage.findMany({ take: 10 })
     * 
     * // Only select the `resourceId`
     * const dedicatedStorageWithResourceIdOnly = await prisma.dedicatedStorage.findMany({ select: { resourceId: true } })
     * 
     */
    findMany<T extends DedicatedStorageFindManyArgs>(args?: SelectSubset<T, DedicatedStorageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DedicatedStorage.
     * @param {DedicatedStorageCreateArgs} args - Arguments to create a DedicatedStorage.
     * @example
     * // Create one DedicatedStorage
     * const DedicatedStorage = await prisma.dedicatedStorage.create({
     *   data: {
     *     // ... data to create a DedicatedStorage
     *   }
     * })
     * 
     */
    create<T extends DedicatedStorageCreateArgs>(args: SelectSubset<T, DedicatedStorageCreateArgs<ExtArgs>>): Prisma__DedicatedStorageClient<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DedicatedStorages.
     * @param {DedicatedStorageCreateManyArgs} args - Arguments to create many DedicatedStorages.
     * @example
     * // Create many DedicatedStorages
     * const dedicatedStorage = await prisma.dedicatedStorage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DedicatedStorageCreateManyArgs>(args?: SelectSubset<T, DedicatedStorageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DedicatedStorages and returns the data saved in the database.
     * @param {DedicatedStorageCreateManyAndReturnArgs} args - Arguments to create many DedicatedStorages.
     * @example
     * // Create many DedicatedStorages
     * const dedicatedStorage = await prisma.dedicatedStorage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DedicatedStorages and only return the `resourceId`
     * const dedicatedStorageWithResourceIdOnly = await prisma.dedicatedStorage.createManyAndReturn({
     *   select: { resourceId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DedicatedStorageCreateManyAndReturnArgs>(args?: SelectSubset<T, DedicatedStorageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DedicatedStorage.
     * @param {DedicatedStorageDeleteArgs} args - Arguments to delete one DedicatedStorage.
     * @example
     * // Delete one DedicatedStorage
     * const DedicatedStorage = await prisma.dedicatedStorage.delete({
     *   where: {
     *     // ... filter to delete one DedicatedStorage
     *   }
     * })
     * 
     */
    delete<T extends DedicatedStorageDeleteArgs>(args: SelectSubset<T, DedicatedStorageDeleteArgs<ExtArgs>>): Prisma__DedicatedStorageClient<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DedicatedStorage.
     * @param {DedicatedStorageUpdateArgs} args - Arguments to update one DedicatedStorage.
     * @example
     * // Update one DedicatedStorage
     * const dedicatedStorage = await prisma.dedicatedStorage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DedicatedStorageUpdateArgs>(args: SelectSubset<T, DedicatedStorageUpdateArgs<ExtArgs>>): Prisma__DedicatedStorageClient<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DedicatedStorages.
     * @param {DedicatedStorageDeleteManyArgs} args - Arguments to filter DedicatedStorages to delete.
     * @example
     * // Delete a few DedicatedStorages
     * const { count } = await prisma.dedicatedStorage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DedicatedStorageDeleteManyArgs>(args?: SelectSubset<T, DedicatedStorageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DedicatedStorages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DedicatedStorageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DedicatedStorages
     * const dedicatedStorage = await prisma.dedicatedStorage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DedicatedStorageUpdateManyArgs>(args: SelectSubset<T, DedicatedStorageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DedicatedStorages and returns the data updated in the database.
     * @param {DedicatedStorageUpdateManyAndReturnArgs} args - Arguments to update many DedicatedStorages.
     * @example
     * // Update many DedicatedStorages
     * const dedicatedStorage = await prisma.dedicatedStorage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DedicatedStorages and only return the `resourceId`
     * const dedicatedStorageWithResourceIdOnly = await prisma.dedicatedStorage.updateManyAndReturn({
     *   select: { resourceId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DedicatedStorageUpdateManyAndReturnArgs>(args: SelectSubset<T, DedicatedStorageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DedicatedStorage.
     * @param {DedicatedStorageUpsertArgs} args - Arguments to update or create a DedicatedStorage.
     * @example
     * // Update or create a DedicatedStorage
     * const dedicatedStorage = await prisma.dedicatedStorage.upsert({
     *   create: {
     *     // ... data to create a DedicatedStorage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DedicatedStorage we want to update
     *   }
     * })
     */
    upsert<T extends DedicatedStorageUpsertArgs>(args: SelectSubset<T, DedicatedStorageUpsertArgs<ExtArgs>>): Prisma__DedicatedStorageClient<$Result.GetResult<Prisma.$DedicatedStoragePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DedicatedStorages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DedicatedStorageCountArgs} args - Arguments to filter DedicatedStorages to count.
     * @example
     * // Count the number of DedicatedStorages
     * const count = await prisma.dedicatedStorage.count({
     *   where: {
     *     // ... the filter for the DedicatedStorages we want to count
     *   }
     * })
    **/
    count<T extends DedicatedStorageCountArgs>(
      args?: Subset<T, DedicatedStorageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DedicatedStorageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DedicatedStorage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DedicatedStorageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DedicatedStorageAggregateArgs>(args: Subset<T, DedicatedStorageAggregateArgs>): Prisma.PrismaPromise<GetDedicatedStorageAggregateType<T>>

    /**
     * Group by DedicatedStorage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DedicatedStorageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DedicatedStorageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DedicatedStorageGroupByArgs['orderBy'] }
        : { orderBy?: DedicatedStorageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DedicatedStorageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDedicatedStorageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DedicatedStorage model
   */
  readonly fields: DedicatedStorageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DedicatedStorage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DedicatedStorageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DedicatedStorage model
   */
  interface DedicatedStorageFieldRefs {
    readonly resourceId: FieldRef<"DedicatedStorage", 'String'>
    readonly clusterId: FieldRef<"DedicatedStorage", 'String'>
    readonly ownerId: FieldRef<"DedicatedStorage", 'Int'>
    readonly amount: FieldRef<"DedicatedStorage", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DedicatedStorage findUnique
   */
  export type DedicatedStorageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * Filter, which DedicatedStorage to fetch.
     */
    where: DedicatedStorageWhereUniqueInput
  }

  /**
   * DedicatedStorage findUniqueOrThrow
   */
  export type DedicatedStorageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * Filter, which DedicatedStorage to fetch.
     */
    where: DedicatedStorageWhereUniqueInput
  }

  /**
   * DedicatedStorage findFirst
   */
  export type DedicatedStorageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * Filter, which DedicatedStorage to fetch.
     */
    where?: DedicatedStorageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DedicatedStorages to fetch.
     */
    orderBy?: DedicatedStorageOrderByWithRelationInput | DedicatedStorageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DedicatedStorages.
     */
    cursor?: DedicatedStorageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DedicatedStorages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DedicatedStorages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DedicatedStorages.
     */
    distinct?: DedicatedStorageScalarFieldEnum | DedicatedStorageScalarFieldEnum[]
  }

  /**
   * DedicatedStorage findFirstOrThrow
   */
  export type DedicatedStorageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * Filter, which DedicatedStorage to fetch.
     */
    where?: DedicatedStorageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DedicatedStorages to fetch.
     */
    orderBy?: DedicatedStorageOrderByWithRelationInput | DedicatedStorageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DedicatedStorages.
     */
    cursor?: DedicatedStorageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DedicatedStorages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DedicatedStorages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DedicatedStorages.
     */
    distinct?: DedicatedStorageScalarFieldEnum | DedicatedStorageScalarFieldEnum[]
  }

  /**
   * DedicatedStorage findMany
   */
  export type DedicatedStorageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * Filter, which DedicatedStorages to fetch.
     */
    where?: DedicatedStorageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DedicatedStorages to fetch.
     */
    orderBy?: DedicatedStorageOrderByWithRelationInput | DedicatedStorageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DedicatedStorages.
     */
    cursor?: DedicatedStorageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DedicatedStorages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DedicatedStorages.
     */
    skip?: number
    distinct?: DedicatedStorageScalarFieldEnum | DedicatedStorageScalarFieldEnum[]
  }

  /**
   * DedicatedStorage create
   */
  export type DedicatedStorageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * The data needed to create a DedicatedStorage.
     */
    data: XOR<DedicatedStorageCreateInput, DedicatedStorageUncheckedCreateInput>
  }

  /**
   * DedicatedStorage createMany
   */
  export type DedicatedStorageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DedicatedStorages.
     */
    data: DedicatedStorageCreateManyInput | DedicatedStorageCreateManyInput[]
  }

  /**
   * DedicatedStorage createManyAndReturn
   */
  export type DedicatedStorageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * The data used to create many DedicatedStorages.
     */
    data: DedicatedStorageCreateManyInput | DedicatedStorageCreateManyInput[]
  }

  /**
   * DedicatedStorage update
   */
  export type DedicatedStorageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * The data needed to update a DedicatedStorage.
     */
    data: XOR<DedicatedStorageUpdateInput, DedicatedStorageUncheckedUpdateInput>
    /**
     * Choose, which DedicatedStorage to update.
     */
    where: DedicatedStorageWhereUniqueInput
  }

  /**
   * DedicatedStorage updateMany
   */
  export type DedicatedStorageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DedicatedStorages.
     */
    data: XOR<DedicatedStorageUpdateManyMutationInput, DedicatedStorageUncheckedUpdateManyInput>
    /**
     * Filter which DedicatedStorages to update
     */
    where?: DedicatedStorageWhereInput
    /**
     * Limit how many DedicatedStorages to update.
     */
    limit?: number
  }

  /**
   * DedicatedStorage updateManyAndReturn
   */
  export type DedicatedStorageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * The data used to update DedicatedStorages.
     */
    data: XOR<DedicatedStorageUpdateManyMutationInput, DedicatedStorageUncheckedUpdateManyInput>
    /**
     * Filter which DedicatedStorages to update
     */
    where?: DedicatedStorageWhereInput
    /**
     * Limit how many DedicatedStorages to update.
     */
    limit?: number
  }

  /**
   * DedicatedStorage upsert
   */
  export type DedicatedStorageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * The filter to search for the DedicatedStorage to update in case it exists.
     */
    where: DedicatedStorageWhereUniqueInput
    /**
     * In case the DedicatedStorage found by the `where` argument doesn't exist, create a new DedicatedStorage with this data.
     */
    create: XOR<DedicatedStorageCreateInput, DedicatedStorageUncheckedCreateInput>
    /**
     * In case the DedicatedStorage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DedicatedStorageUpdateInput, DedicatedStorageUncheckedUpdateInput>
  }

  /**
   * DedicatedStorage delete
   */
  export type DedicatedStorageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
    /**
     * Filter which DedicatedStorage to delete.
     */
    where: DedicatedStorageWhereUniqueInput
  }

  /**
   * DedicatedStorage deleteMany
   */
  export type DedicatedStorageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DedicatedStorages to delete
     */
    where?: DedicatedStorageWhereInput
    /**
     * Limit how many DedicatedStorages to delete.
     */
    limit?: number
  }

  /**
   * DedicatedStorage without action
   */
  export type DedicatedStorageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DedicatedStorage
     */
    select?: DedicatedStorageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DedicatedStorage
     */
    omit?: DedicatedStorageOmit<ExtArgs> | null
  }


  /**
   * Model DeductionAuditLog
   */

  export type AggregateDeductionAuditLog = {
    _count: DeductionAuditLogCountAggregateOutputType | null
    _avg: DeductionAuditLogAvgAggregateOutputType | null
    _sum: DeductionAuditLogSumAggregateOutputType | null
    _min: DeductionAuditLogMinAggregateOutputType | null
    _max: DeductionAuditLogMaxAggregateOutputType | null
  }

  export type DeductionAuditLogAvgAggregateOutputType = {
    id: number | null
    ownerId: number | null
    totalCost: number | null
    balanceAtEvent: number | null
  }

  export type DeductionAuditLogSumAggregateOutputType = {
    id: number | null
    ownerId: number | null
    totalCost: number | null
    balanceAtEvent: number | null
  }

  export type DeductionAuditLogMinAggregateOutputType = {
    id: number | null
    clusterId: string | null
    ownerId: number | null
    resourceId: string | null
    totalCost: number | null
    succeeded: boolean | null
    balanceAtEvent: number | null
    createdAt: Date | null
  }

  export type DeductionAuditLogMaxAggregateOutputType = {
    id: number | null
    clusterId: string | null
    ownerId: number | null
    resourceId: string | null
    totalCost: number | null
    succeeded: boolean | null
    balanceAtEvent: number | null
    createdAt: Date | null
  }

  export type DeductionAuditLogCountAggregateOutputType = {
    id: number
    clusterId: number
    ownerId: number
    resourceId: number
    totalCost: number
    succeeded: number
    balanceAtEvent: number
    createdAt: number
    _all: number
  }


  export type DeductionAuditLogAvgAggregateInputType = {
    id?: true
    ownerId?: true
    totalCost?: true
    balanceAtEvent?: true
  }

  export type DeductionAuditLogSumAggregateInputType = {
    id?: true
    ownerId?: true
    totalCost?: true
    balanceAtEvent?: true
  }

  export type DeductionAuditLogMinAggregateInputType = {
    id?: true
    clusterId?: true
    ownerId?: true
    resourceId?: true
    totalCost?: true
    succeeded?: true
    balanceAtEvent?: true
    createdAt?: true
  }

  export type DeductionAuditLogMaxAggregateInputType = {
    id?: true
    clusterId?: true
    ownerId?: true
    resourceId?: true
    totalCost?: true
    succeeded?: true
    balanceAtEvent?: true
    createdAt?: true
  }

  export type DeductionAuditLogCountAggregateInputType = {
    id?: true
    clusterId?: true
    ownerId?: true
    resourceId?: true
    totalCost?: true
    succeeded?: true
    balanceAtEvent?: true
    createdAt?: true
    _all?: true
  }

  export type DeductionAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeductionAuditLog to aggregate.
     */
    where?: DeductionAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeductionAuditLogs to fetch.
     */
    orderBy?: DeductionAuditLogOrderByWithRelationInput | DeductionAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeductionAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeductionAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeductionAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeductionAuditLogs
    **/
    _count?: true | DeductionAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeductionAuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeductionAuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeductionAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeductionAuditLogMaxAggregateInputType
  }

  export type GetDeductionAuditLogAggregateType<T extends DeductionAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateDeductionAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeductionAuditLog[P]>
      : GetScalarType<T[P], AggregateDeductionAuditLog[P]>
  }




  export type DeductionAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeductionAuditLogWhereInput
    orderBy?: DeductionAuditLogOrderByWithAggregationInput | DeductionAuditLogOrderByWithAggregationInput[]
    by: DeductionAuditLogScalarFieldEnum[] | DeductionAuditLogScalarFieldEnum
    having?: DeductionAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeductionAuditLogCountAggregateInputType | true
    _avg?: DeductionAuditLogAvgAggregateInputType
    _sum?: DeductionAuditLogSumAggregateInputType
    _min?: DeductionAuditLogMinAggregateInputType
    _max?: DeductionAuditLogMaxAggregateInputType
  }

  export type DeductionAuditLogGroupByOutputType = {
    id: number
    clusterId: string
    ownerId: number
    resourceId: string
    totalCost: number
    succeeded: boolean
    balanceAtEvent: number
    createdAt: Date
    _count: DeductionAuditLogCountAggregateOutputType | null
    _avg: DeductionAuditLogAvgAggregateOutputType | null
    _sum: DeductionAuditLogSumAggregateOutputType | null
    _min: DeductionAuditLogMinAggregateOutputType | null
    _max: DeductionAuditLogMaxAggregateOutputType | null
  }

  type GetDeductionAuditLogGroupByPayload<T extends DeductionAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeductionAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeductionAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeductionAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], DeductionAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type DeductionAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clusterId?: boolean
    ownerId?: boolean
    resourceId?: boolean
    totalCost?: boolean
    succeeded?: boolean
    balanceAtEvent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["deductionAuditLog"]>

  export type DeductionAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clusterId?: boolean
    ownerId?: boolean
    resourceId?: boolean
    totalCost?: boolean
    succeeded?: boolean
    balanceAtEvent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["deductionAuditLog"]>

  export type DeductionAuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clusterId?: boolean
    ownerId?: boolean
    resourceId?: boolean
    totalCost?: boolean
    succeeded?: boolean
    balanceAtEvent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["deductionAuditLog"]>

  export type DeductionAuditLogSelectScalar = {
    id?: boolean
    clusterId?: boolean
    ownerId?: boolean
    resourceId?: boolean
    totalCost?: boolean
    succeeded?: boolean
    balanceAtEvent?: boolean
    createdAt?: boolean
  }

  export type DeductionAuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clusterId" | "ownerId" | "resourceId" | "totalCost" | "succeeded" | "balanceAtEvent" | "createdAt", ExtArgs["result"]["deductionAuditLog"]>

  export type $DeductionAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeductionAuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clusterId: string
      ownerId: number
      resourceId: string
      totalCost: number
      succeeded: boolean
      balanceAtEvent: number
      createdAt: Date
    }, ExtArgs["result"]["deductionAuditLog"]>
    composites: {}
  }

  type DeductionAuditLogGetPayload<S extends boolean | null | undefined | DeductionAuditLogDefaultArgs> = $Result.GetResult<Prisma.$DeductionAuditLogPayload, S>

  type DeductionAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeductionAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeductionAuditLogCountAggregateInputType | true
    }

  export interface DeductionAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeductionAuditLog'], meta: { name: 'DeductionAuditLog' } }
    /**
     * Find zero or one DeductionAuditLog that matches the filter.
     * @param {DeductionAuditLogFindUniqueArgs} args - Arguments to find a DeductionAuditLog
     * @example
     * // Get one DeductionAuditLog
     * const deductionAuditLog = await prisma.deductionAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeductionAuditLogFindUniqueArgs>(args: SelectSubset<T, DeductionAuditLogFindUniqueArgs<ExtArgs>>): Prisma__DeductionAuditLogClient<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeductionAuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeductionAuditLogFindUniqueOrThrowArgs} args - Arguments to find a DeductionAuditLog
     * @example
     * // Get one DeductionAuditLog
     * const deductionAuditLog = await prisma.deductionAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeductionAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, DeductionAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeductionAuditLogClient<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeductionAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeductionAuditLogFindFirstArgs} args - Arguments to find a DeductionAuditLog
     * @example
     * // Get one DeductionAuditLog
     * const deductionAuditLog = await prisma.deductionAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeductionAuditLogFindFirstArgs>(args?: SelectSubset<T, DeductionAuditLogFindFirstArgs<ExtArgs>>): Prisma__DeductionAuditLogClient<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeductionAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeductionAuditLogFindFirstOrThrowArgs} args - Arguments to find a DeductionAuditLog
     * @example
     * // Get one DeductionAuditLog
     * const deductionAuditLog = await prisma.deductionAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeductionAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, DeductionAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeductionAuditLogClient<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeductionAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeductionAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeductionAuditLogs
     * const deductionAuditLogs = await prisma.deductionAuditLog.findMany()
     * 
     * // Get first 10 DeductionAuditLogs
     * const deductionAuditLogs = await prisma.deductionAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deductionAuditLogWithIdOnly = await prisma.deductionAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeductionAuditLogFindManyArgs>(args?: SelectSubset<T, DeductionAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeductionAuditLog.
     * @param {DeductionAuditLogCreateArgs} args - Arguments to create a DeductionAuditLog.
     * @example
     * // Create one DeductionAuditLog
     * const DeductionAuditLog = await prisma.deductionAuditLog.create({
     *   data: {
     *     // ... data to create a DeductionAuditLog
     *   }
     * })
     * 
     */
    create<T extends DeductionAuditLogCreateArgs>(args: SelectSubset<T, DeductionAuditLogCreateArgs<ExtArgs>>): Prisma__DeductionAuditLogClient<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeductionAuditLogs.
     * @param {DeductionAuditLogCreateManyArgs} args - Arguments to create many DeductionAuditLogs.
     * @example
     * // Create many DeductionAuditLogs
     * const deductionAuditLog = await prisma.deductionAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeductionAuditLogCreateManyArgs>(args?: SelectSubset<T, DeductionAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeductionAuditLogs and returns the data saved in the database.
     * @param {DeductionAuditLogCreateManyAndReturnArgs} args - Arguments to create many DeductionAuditLogs.
     * @example
     * // Create many DeductionAuditLogs
     * const deductionAuditLog = await prisma.deductionAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeductionAuditLogs and only return the `id`
     * const deductionAuditLogWithIdOnly = await prisma.deductionAuditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeductionAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, DeductionAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeductionAuditLog.
     * @param {DeductionAuditLogDeleteArgs} args - Arguments to delete one DeductionAuditLog.
     * @example
     * // Delete one DeductionAuditLog
     * const DeductionAuditLog = await prisma.deductionAuditLog.delete({
     *   where: {
     *     // ... filter to delete one DeductionAuditLog
     *   }
     * })
     * 
     */
    delete<T extends DeductionAuditLogDeleteArgs>(args: SelectSubset<T, DeductionAuditLogDeleteArgs<ExtArgs>>): Prisma__DeductionAuditLogClient<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeductionAuditLog.
     * @param {DeductionAuditLogUpdateArgs} args - Arguments to update one DeductionAuditLog.
     * @example
     * // Update one DeductionAuditLog
     * const deductionAuditLog = await prisma.deductionAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeductionAuditLogUpdateArgs>(args: SelectSubset<T, DeductionAuditLogUpdateArgs<ExtArgs>>): Prisma__DeductionAuditLogClient<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeductionAuditLogs.
     * @param {DeductionAuditLogDeleteManyArgs} args - Arguments to filter DeductionAuditLogs to delete.
     * @example
     * // Delete a few DeductionAuditLogs
     * const { count } = await prisma.deductionAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeductionAuditLogDeleteManyArgs>(args?: SelectSubset<T, DeductionAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeductionAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeductionAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeductionAuditLogs
     * const deductionAuditLog = await prisma.deductionAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeductionAuditLogUpdateManyArgs>(args: SelectSubset<T, DeductionAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeductionAuditLogs and returns the data updated in the database.
     * @param {DeductionAuditLogUpdateManyAndReturnArgs} args - Arguments to update many DeductionAuditLogs.
     * @example
     * // Update many DeductionAuditLogs
     * const deductionAuditLog = await prisma.deductionAuditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeductionAuditLogs and only return the `id`
     * const deductionAuditLogWithIdOnly = await prisma.deductionAuditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeductionAuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, DeductionAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeductionAuditLog.
     * @param {DeductionAuditLogUpsertArgs} args - Arguments to update or create a DeductionAuditLog.
     * @example
     * // Update or create a DeductionAuditLog
     * const deductionAuditLog = await prisma.deductionAuditLog.upsert({
     *   create: {
     *     // ... data to create a DeductionAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeductionAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends DeductionAuditLogUpsertArgs>(args: SelectSubset<T, DeductionAuditLogUpsertArgs<ExtArgs>>): Prisma__DeductionAuditLogClient<$Result.GetResult<Prisma.$DeductionAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeductionAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeductionAuditLogCountArgs} args - Arguments to filter DeductionAuditLogs to count.
     * @example
     * // Count the number of DeductionAuditLogs
     * const count = await prisma.deductionAuditLog.count({
     *   where: {
     *     // ... the filter for the DeductionAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends DeductionAuditLogCountArgs>(
      args?: Subset<T, DeductionAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeductionAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeductionAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeductionAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeductionAuditLogAggregateArgs>(args: Subset<T, DeductionAuditLogAggregateArgs>): Prisma.PrismaPromise<GetDeductionAuditLogAggregateType<T>>

    /**
     * Group by DeductionAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeductionAuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeductionAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeductionAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: DeductionAuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeductionAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeductionAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeductionAuditLog model
   */
  readonly fields: DeductionAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeductionAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeductionAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DeductionAuditLog model
   */
  interface DeductionAuditLogFieldRefs {
    readonly id: FieldRef<"DeductionAuditLog", 'Int'>
    readonly clusterId: FieldRef<"DeductionAuditLog", 'String'>
    readonly ownerId: FieldRef<"DeductionAuditLog", 'Int'>
    readonly resourceId: FieldRef<"DeductionAuditLog", 'String'>
    readonly totalCost: FieldRef<"DeductionAuditLog", 'Int'>
    readonly succeeded: FieldRef<"DeductionAuditLog", 'Boolean'>
    readonly balanceAtEvent: FieldRef<"DeductionAuditLog", 'Int'>
    readonly createdAt: FieldRef<"DeductionAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeductionAuditLog findUnique
   */
  export type DeductionAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which DeductionAuditLog to fetch.
     */
    where: DeductionAuditLogWhereUniqueInput
  }

  /**
   * DeductionAuditLog findUniqueOrThrow
   */
  export type DeductionAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which DeductionAuditLog to fetch.
     */
    where: DeductionAuditLogWhereUniqueInput
  }

  /**
   * DeductionAuditLog findFirst
   */
  export type DeductionAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which DeductionAuditLog to fetch.
     */
    where?: DeductionAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeductionAuditLogs to fetch.
     */
    orderBy?: DeductionAuditLogOrderByWithRelationInput | DeductionAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeductionAuditLogs.
     */
    cursor?: DeductionAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeductionAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeductionAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeductionAuditLogs.
     */
    distinct?: DeductionAuditLogScalarFieldEnum | DeductionAuditLogScalarFieldEnum[]
  }

  /**
   * DeductionAuditLog findFirstOrThrow
   */
  export type DeductionAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which DeductionAuditLog to fetch.
     */
    where?: DeductionAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeductionAuditLogs to fetch.
     */
    orderBy?: DeductionAuditLogOrderByWithRelationInput | DeductionAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeductionAuditLogs.
     */
    cursor?: DeductionAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeductionAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeductionAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeductionAuditLogs.
     */
    distinct?: DeductionAuditLogScalarFieldEnum | DeductionAuditLogScalarFieldEnum[]
  }

  /**
   * DeductionAuditLog findMany
   */
  export type DeductionAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which DeductionAuditLogs to fetch.
     */
    where?: DeductionAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeductionAuditLogs to fetch.
     */
    orderBy?: DeductionAuditLogOrderByWithRelationInput | DeductionAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeductionAuditLogs.
     */
    cursor?: DeductionAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeductionAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeductionAuditLogs.
     */
    skip?: number
    distinct?: DeductionAuditLogScalarFieldEnum | DeductionAuditLogScalarFieldEnum[]
  }

  /**
   * DeductionAuditLog create
   */
  export type DeductionAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a DeductionAuditLog.
     */
    data: XOR<DeductionAuditLogCreateInput, DeductionAuditLogUncheckedCreateInput>
  }

  /**
   * DeductionAuditLog createMany
   */
  export type DeductionAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeductionAuditLogs.
     */
    data: DeductionAuditLogCreateManyInput | DeductionAuditLogCreateManyInput[]
  }

  /**
   * DeductionAuditLog createManyAndReturn
   */
  export type DeductionAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many DeductionAuditLogs.
     */
    data: DeductionAuditLogCreateManyInput | DeductionAuditLogCreateManyInput[]
  }

  /**
   * DeductionAuditLog update
   */
  export type DeductionAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a DeductionAuditLog.
     */
    data: XOR<DeductionAuditLogUpdateInput, DeductionAuditLogUncheckedUpdateInput>
    /**
     * Choose, which DeductionAuditLog to update.
     */
    where: DeductionAuditLogWhereUniqueInput
  }

  /**
   * DeductionAuditLog updateMany
   */
  export type DeductionAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeductionAuditLogs.
     */
    data: XOR<DeductionAuditLogUpdateManyMutationInput, DeductionAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which DeductionAuditLogs to update
     */
    where?: DeductionAuditLogWhereInput
    /**
     * Limit how many DeductionAuditLogs to update.
     */
    limit?: number
  }

  /**
   * DeductionAuditLog updateManyAndReturn
   */
  export type DeductionAuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * The data used to update DeductionAuditLogs.
     */
    data: XOR<DeductionAuditLogUpdateManyMutationInput, DeductionAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which DeductionAuditLogs to update
     */
    where?: DeductionAuditLogWhereInput
    /**
     * Limit how many DeductionAuditLogs to update.
     */
    limit?: number
  }

  /**
   * DeductionAuditLog upsert
   */
  export type DeductionAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the DeductionAuditLog to update in case it exists.
     */
    where: DeductionAuditLogWhereUniqueInput
    /**
     * In case the DeductionAuditLog found by the `where` argument doesn't exist, create a new DeductionAuditLog with this data.
     */
    create: XOR<DeductionAuditLogCreateInput, DeductionAuditLogUncheckedCreateInput>
    /**
     * In case the DeductionAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeductionAuditLogUpdateInput, DeductionAuditLogUncheckedUpdateInput>
  }

  /**
   * DeductionAuditLog delete
   */
  export type DeductionAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
    /**
     * Filter which DeductionAuditLog to delete.
     */
    where: DeductionAuditLogWhereUniqueInput
  }

  /**
   * DeductionAuditLog deleteMany
   */
  export type DeductionAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeductionAuditLogs to delete
     */
    where?: DeductionAuditLogWhereInput
    /**
     * Limit how many DeductionAuditLogs to delete.
     */
    limit?: number
  }

  /**
   * DeductionAuditLog without action
   */
  export type DeductionAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeductionAuditLog
     */
    select?: DeductionAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeductionAuditLog
     */
    omit?: DeductionAuditLogOmit<ExtArgs> | null
  }


  /**
   * Model ResourceRateCeiling
   */

  export type AggregateResourceRateCeiling = {
    _count: ResourceRateCeilingCountAggregateOutputType | null
    _avg: ResourceRateCeilingAvgAggregateOutputType | null
    _sum: ResourceRateCeilingSumAggregateOutputType | null
    _min: ResourceRateCeilingMinAggregateOutputType | null
    _max: ResourceRateCeilingMaxAggregateOutputType | null
  }

  export type ResourceRateCeilingAvgAggregateOutputType = {
    maxLegitRatePerSec: Decimal | null
  }

  export type ResourceRateCeilingSumAggregateOutputType = {
    maxLegitRatePerSec: Decimal | null
  }

  export type ResourceRateCeilingMinAggregateOutputType = {
    resourceId: string | null
    maxLegitRatePerSec: Decimal | null
    notes: string | null
  }

  export type ResourceRateCeilingMaxAggregateOutputType = {
    resourceId: string | null
    maxLegitRatePerSec: Decimal | null
    notes: string | null
  }

  export type ResourceRateCeilingCountAggregateOutputType = {
    resourceId: number
    maxLegitRatePerSec: number
    notes: number
    _all: number
  }


  export type ResourceRateCeilingAvgAggregateInputType = {
    maxLegitRatePerSec?: true
  }

  export type ResourceRateCeilingSumAggregateInputType = {
    maxLegitRatePerSec?: true
  }

  export type ResourceRateCeilingMinAggregateInputType = {
    resourceId?: true
    maxLegitRatePerSec?: true
    notes?: true
  }

  export type ResourceRateCeilingMaxAggregateInputType = {
    resourceId?: true
    maxLegitRatePerSec?: true
    notes?: true
  }

  export type ResourceRateCeilingCountAggregateInputType = {
    resourceId?: true
    maxLegitRatePerSec?: true
    notes?: true
    _all?: true
  }

  export type ResourceRateCeilingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceRateCeiling to aggregate.
     */
    where?: ResourceRateCeilingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRateCeilings to fetch.
     */
    orderBy?: ResourceRateCeilingOrderByWithRelationInput | ResourceRateCeilingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceRateCeilingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRateCeilings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRateCeilings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResourceRateCeilings
    **/
    _count?: true | ResourceRateCeilingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResourceRateCeilingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResourceRateCeilingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceRateCeilingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceRateCeilingMaxAggregateInputType
  }

  export type GetResourceRateCeilingAggregateType<T extends ResourceRateCeilingAggregateArgs> = {
        [P in keyof T & keyof AggregateResourceRateCeiling]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResourceRateCeiling[P]>
      : GetScalarType<T[P], AggregateResourceRateCeiling[P]>
  }




  export type ResourceRateCeilingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceRateCeilingWhereInput
    orderBy?: ResourceRateCeilingOrderByWithAggregationInput | ResourceRateCeilingOrderByWithAggregationInput[]
    by: ResourceRateCeilingScalarFieldEnum[] | ResourceRateCeilingScalarFieldEnum
    having?: ResourceRateCeilingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceRateCeilingCountAggregateInputType | true
    _avg?: ResourceRateCeilingAvgAggregateInputType
    _sum?: ResourceRateCeilingSumAggregateInputType
    _min?: ResourceRateCeilingMinAggregateInputType
    _max?: ResourceRateCeilingMaxAggregateInputType
  }

  export type ResourceRateCeilingGroupByOutputType = {
    resourceId: string
    maxLegitRatePerSec: Decimal
    notes: string | null
    _count: ResourceRateCeilingCountAggregateOutputType | null
    _avg: ResourceRateCeilingAvgAggregateOutputType | null
    _sum: ResourceRateCeilingSumAggregateOutputType | null
    _min: ResourceRateCeilingMinAggregateOutputType | null
    _max: ResourceRateCeilingMaxAggregateOutputType | null
  }

  type GetResourceRateCeilingGroupByPayload<T extends ResourceRateCeilingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceRateCeilingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceRateCeilingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceRateCeilingGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceRateCeilingGroupByOutputType[P]>
        }
      >
    >


  export type ResourceRateCeilingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    resourceId?: boolean
    maxLegitRatePerSec?: boolean
    notes?: boolean
  }, ExtArgs["result"]["resourceRateCeiling"]>

  export type ResourceRateCeilingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    resourceId?: boolean
    maxLegitRatePerSec?: boolean
    notes?: boolean
  }, ExtArgs["result"]["resourceRateCeiling"]>

  export type ResourceRateCeilingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    resourceId?: boolean
    maxLegitRatePerSec?: boolean
    notes?: boolean
  }, ExtArgs["result"]["resourceRateCeiling"]>

  export type ResourceRateCeilingSelectScalar = {
    resourceId?: boolean
    maxLegitRatePerSec?: boolean
    notes?: boolean
  }

  export type ResourceRateCeilingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"resourceId" | "maxLegitRatePerSec" | "notes", ExtArgs["result"]["resourceRateCeiling"]>

  export type $ResourceRateCeilingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResourceRateCeiling"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      resourceId: string
      maxLegitRatePerSec: Prisma.Decimal
      notes: string | null
    }, ExtArgs["result"]["resourceRateCeiling"]>
    composites: {}
  }

  type ResourceRateCeilingGetPayload<S extends boolean | null | undefined | ResourceRateCeilingDefaultArgs> = $Result.GetResult<Prisma.$ResourceRateCeilingPayload, S>

  type ResourceRateCeilingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceRateCeilingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceRateCeilingCountAggregateInputType | true
    }

  export interface ResourceRateCeilingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResourceRateCeiling'], meta: { name: 'ResourceRateCeiling' } }
    /**
     * Find zero or one ResourceRateCeiling that matches the filter.
     * @param {ResourceRateCeilingFindUniqueArgs} args - Arguments to find a ResourceRateCeiling
     * @example
     * // Get one ResourceRateCeiling
     * const resourceRateCeiling = await prisma.resourceRateCeiling.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceRateCeilingFindUniqueArgs>(args: SelectSubset<T, ResourceRateCeilingFindUniqueArgs<ExtArgs>>): Prisma__ResourceRateCeilingClient<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResourceRateCeiling that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceRateCeilingFindUniqueOrThrowArgs} args - Arguments to find a ResourceRateCeiling
     * @example
     * // Get one ResourceRateCeiling
     * const resourceRateCeiling = await prisma.resourceRateCeiling.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceRateCeilingFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceRateCeilingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceRateCeilingClient<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceRateCeiling that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRateCeilingFindFirstArgs} args - Arguments to find a ResourceRateCeiling
     * @example
     * // Get one ResourceRateCeiling
     * const resourceRateCeiling = await prisma.resourceRateCeiling.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceRateCeilingFindFirstArgs>(args?: SelectSubset<T, ResourceRateCeilingFindFirstArgs<ExtArgs>>): Prisma__ResourceRateCeilingClient<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceRateCeiling that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRateCeilingFindFirstOrThrowArgs} args - Arguments to find a ResourceRateCeiling
     * @example
     * // Get one ResourceRateCeiling
     * const resourceRateCeiling = await prisma.resourceRateCeiling.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceRateCeilingFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceRateCeilingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceRateCeilingClient<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResourceRateCeilings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRateCeilingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResourceRateCeilings
     * const resourceRateCeilings = await prisma.resourceRateCeiling.findMany()
     * 
     * // Get first 10 ResourceRateCeilings
     * const resourceRateCeilings = await prisma.resourceRateCeiling.findMany({ take: 10 })
     * 
     * // Only select the `resourceId`
     * const resourceRateCeilingWithResourceIdOnly = await prisma.resourceRateCeiling.findMany({ select: { resourceId: true } })
     * 
     */
    findMany<T extends ResourceRateCeilingFindManyArgs>(args?: SelectSubset<T, ResourceRateCeilingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResourceRateCeiling.
     * @param {ResourceRateCeilingCreateArgs} args - Arguments to create a ResourceRateCeiling.
     * @example
     * // Create one ResourceRateCeiling
     * const ResourceRateCeiling = await prisma.resourceRateCeiling.create({
     *   data: {
     *     // ... data to create a ResourceRateCeiling
     *   }
     * })
     * 
     */
    create<T extends ResourceRateCeilingCreateArgs>(args: SelectSubset<T, ResourceRateCeilingCreateArgs<ExtArgs>>): Prisma__ResourceRateCeilingClient<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResourceRateCeilings.
     * @param {ResourceRateCeilingCreateManyArgs} args - Arguments to create many ResourceRateCeilings.
     * @example
     * // Create many ResourceRateCeilings
     * const resourceRateCeiling = await prisma.resourceRateCeiling.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceRateCeilingCreateManyArgs>(args?: SelectSubset<T, ResourceRateCeilingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResourceRateCeilings and returns the data saved in the database.
     * @param {ResourceRateCeilingCreateManyAndReturnArgs} args - Arguments to create many ResourceRateCeilings.
     * @example
     * // Create many ResourceRateCeilings
     * const resourceRateCeiling = await prisma.resourceRateCeiling.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResourceRateCeilings and only return the `resourceId`
     * const resourceRateCeilingWithResourceIdOnly = await prisma.resourceRateCeiling.createManyAndReturn({
     *   select: { resourceId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceRateCeilingCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceRateCeilingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResourceRateCeiling.
     * @param {ResourceRateCeilingDeleteArgs} args - Arguments to delete one ResourceRateCeiling.
     * @example
     * // Delete one ResourceRateCeiling
     * const ResourceRateCeiling = await prisma.resourceRateCeiling.delete({
     *   where: {
     *     // ... filter to delete one ResourceRateCeiling
     *   }
     * })
     * 
     */
    delete<T extends ResourceRateCeilingDeleteArgs>(args: SelectSubset<T, ResourceRateCeilingDeleteArgs<ExtArgs>>): Prisma__ResourceRateCeilingClient<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResourceRateCeiling.
     * @param {ResourceRateCeilingUpdateArgs} args - Arguments to update one ResourceRateCeiling.
     * @example
     * // Update one ResourceRateCeiling
     * const resourceRateCeiling = await prisma.resourceRateCeiling.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceRateCeilingUpdateArgs>(args: SelectSubset<T, ResourceRateCeilingUpdateArgs<ExtArgs>>): Prisma__ResourceRateCeilingClient<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResourceRateCeilings.
     * @param {ResourceRateCeilingDeleteManyArgs} args - Arguments to filter ResourceRateCeilings to delete.
     * @example
     * // Delete a few ResourceRateCeilings
     * const { count } = await prisma.resourceRateCeiling.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceRateCeilingDeleteManyArgs>(args?: SelectSubset<T, ResourceRateCeilingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceRateCeilings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRateCeilingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResourceRateCeilings
     * const resourceRateCeiling = await prisma.resourceRateCeiling.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceRateCeilingUpdateManyArgs>(args: SelectSubset<T, ResourceRateCeilingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceRateCeilings and returns the data updated in the database.
     * @param {ResourceRateCeilingUpdateManyAndReturnArgs} args - Arguments to update many ResourceRateCeilings.
     * @example
     * // Update many ResourceRateCeilings
     * const resourceRateCeiling = await prisma.resourceRateCeiling.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResourceRateCeilings and only return the `resourceId`
     * const resourceRateCeilingWithResourceIdOnly = await prisma.resourceRateCeiling.updateManyAndReturn({
     *   select: { resourceId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceRateCeilingUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceRateCeilingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResourceRateCeiling.
     * @param {ResourceRateCeilingUpsertArgs} args - Arguments to update or create a ResourceRateCeiling.
     * @example
     * // Update or create a ResourceRateCeiling
     * const resourceRateCeiling = await prisma.resourceRateCeiling.upsert({
     *   create: {
     *     // ... data to create a ResourceRateCeiling
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResourceRateCeiling we want to update
     *   }
     * })
     */
    upsert<T extends ResourceRateCeilingUpsertArgs>(args: SelectSubset<T, ResourceRateCeilingUpsertArgs<ExtArgs>>): Prisma__ResourceRateCeilingClient<$Result.GetResult<Prisma.$ResourceRateCeilingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResourceRateCeilings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRateCeilingCountArgs} args - Arguments to filter ResourceRateCeilings to count.
     * @example
     * // Count the number of ResourceRateCeilings
     * const count = await prisma.resourceRateCeiling.count({
     *   where: {
     *     // ... the filter for the ResourceRateCeilings we want to count
     *   }
     * })
    **/
    count<T extends ResourceRateCeilingCountArgs>(
      args?: Subset<T, ResourceRateCeilingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceRateCeilingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResourceRateCeiling.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRateCeilingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceRateCeilingAggregateArgs>(args: Subset<T, ResourceRateCeilingAggregateArgs>): Prisma.PrismaPromise<GetResourceRateCeilingAggregateType<T>>

    /**
     * Group by ResourceRateCeiling.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRateCeilingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceRateCeilingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceRateCeilingGroupByArgs['orderBy'] }
        : { orderBy?: ResourceRateCeilingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceRateCeilingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceRateCeilingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResourceRateCeiling model
   */
  readonly fields: ResourceRateCeilingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResourceRateCeiling.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceRateCeilingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResourceRateCeiling model
   */
  interface ResourceRateCeilingFieldRefs {
    readonly resourceId: FieldRef<"ResourceRateCeiling", 'String'>
    readonly maxLegitRatePerSec: FieldRef<"ResourceRateCeiling", 'Decimal'>
    readonly notes: FieldRef<"ResourceRateCeiling", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResourceRateCeiling findUnique
   */
  export type ResourceRateCeilingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * Filter, which ResourceRateCeiling to fetch.
     */
    where: ResourceRateCeilingWhereUniqueInput
  }

  /**
   * ResourceRateCeiling findUniqueOrThrow
   */
  export type ResourceRateCeilingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * Filter, which ResourceRateCeiling to fetch.
     */
    where: ResourceRateCeilingWhereUniqueInput
  }

  /**
   * ResourceRateCeiling findFirst
   */
  export type ResourceRateCeilingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * Filter, which ResourceRateCeiling to fetch.
     */
    where?: ResourceRateCeilingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRateCeilings to fetch.
     */
    orderBy?: ResourceRateCeilingOrderByWithRelationInput | ResourceRateCeilingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceRateCeilings.
     */
    cursor?: ResourceRateCeilingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRateCeilings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRateCeilings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceRateCeilings.
     */
    distinct?: ResourceRateCeilingScalarFieldEnum | ResourceRateCeilingScalarFieldEnum[]
  }

  /**
   * ResourceRateCeiling findFirstOrThrow
   */
  export type ResourceRateCeilingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * Filter, which ResourceRateCeiling to fetch.
     */
    where?: ResourceRateCeilingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRateCeilings to fetch.
     */
    orderBy?: ResourceRateCeilingOrderByWithRelationInput | ResourceRateCeilingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceRateCeilings.
     */
    cursor?: ResourceRateCeilingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRateCeilings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRateCeilings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceRateCeilings.
     */
    distinct?: ResourceRateCeilingScalarFieldEnum | ResourceRateCeilingScalarFieldEnum[]
  }

  /**
   * ResourceRateCeiling findMany
   */
  export type ResourceRateCeilingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * Filter, which ResourceRateCeilings to fetch.
     */
    where?: ResourceRateCeilingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRateCeilings to fetch.
     */
    orderBy?: ResourceRateCeilingOrderByWithRelationInput | ResourceRateCeilingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResourceRateCeilings.
     */
    cursor?: ResourceRateCeilingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRateCeilings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRateCeilings.
     */
    skip?: number
    distinct?: ResourceRateCeilingScalarFieldEnum | ResourceRateCeilingScalarFieldEnum[]
  }

  /**
   * ResourceRateCeiling create
   */
  export type ResourceRateCeilingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * The data needed to create a ResourceRateCeiling.
     */
    data: XOR<ResourceRateCeilingCreateInput, ResourceRateCeilingUncheckedCreateInput>
  }

  /**
   * ResourceRateCeiling createMany
   */
  export type ResourceRateCeilingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResourceRateCeilings.
     */
    data: ResourceRateCeilingCreateManyInput | ResourceRateCeilingCreateManyInput[]
  }

  /**
   * ResourceRateCeiling createManyAndReturn
   */
  export type ResourceRateCeilingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * The data used to create many ResourceRateCeilings.
     */
    data: ResourceRateCeilingCreateManyInput | ResourceRateCeilingCreateManyInput[]
  }

  /**
   * ResourceRateCeiling update
   */
  export type ResourceRateCeilingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * The data needed to update a ResourceRateCeiling.
     */
    data: XOR<ResourceRateCeilingUpdateInput, ResourceRateCeilingUncheckedUpdateInput>
    /**
     * Choose, which ResourceRateCeiling to update.
     */
    where: ResourceRateCeilingWhereUniqueInput
  }

  /**
   * ResourceRateCeiling updateMany
   */
  export type ResourceRateCeilingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResourceRateCeilings.
     */
    data: XOR<ResourceRateCeilingUpdateManyMutationInput, ResourceRateCeilingUncheckedUpdateManyInput>
    /**
     * Filter which ResourceRateCeilings to update
     */
    where?: ResourceRateCeilingWhereInput
    /**
     * Limit how many ResourceRateCeilings to update.
     */
    limit?: number
  }

  /**
   * ResourceRateCeiling updateManyAndReturn
   */
  export type ResourceRateCeilingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * The data used to update ResourceRateCeilings.
     */
    data: XOR<ResourceRateCeilingUpdateManyMutationInput, ResourceRateCeilingUncheckedUpdateManyInput>
    /**
     * Filter which ResourceRateCeilings to update
     */
    where?: ResourceRateCeilingWhereInput
    /**
     * Limit how many ResourceRateCeilings to update.
     */
    limit?: number
  }

  /**
   * ResourceRateCeiling upsert
   */
  export type ResourceRateCeilingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * The filter to search for the ResourceRateCeiling to update in case it exists.
     */
    where: ResourceRateCeilingWhereUniqueInput
    /**
     * In case the ResourceRateCeiling found by the `where` argument doesn't exist, create a new ResourceRateCeiling with this data.
     */
    create: XOR<ResourceRateCeilingCreateInput, ResourceRateCeilingUncheckedCreateInput>
    /**
     * In case the ResourceRateCeiling was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceRateCeilingUpdateInput, ResourceRateCeilingUncheckedUpdateInput>
  }

  /**
   * ResourceRateCeiling delete
   */
  export type ResourceRateCeilingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
    /**
     * Filter which ResourceRateCeiling to delete.
     */
    where: ResourceRateCeilingWhereUniqueInput
  }

  /**
   * ResourceRateCeiling deleteMany
   */
  export type ResourceRateCeilingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceRateCeilings to delete
     */
    where?: ResourceRateCeilingWhereInput
    /**
     * Limit how many ResourceRateCeilings to delete.
     */
    limit?: number
  }

  /**
   * ResourceRateCeiling without action
   */
  export type ResourceRateCeilingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRateCeiling
     */
    select?: ResourceRateCeilingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRateCeiling
     */
    omit?: ResourceRateCeilingOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClusterScalarFieldEnum: {
    id: 'id',
    secret: 'secret'
  };

  export type ClusterScalarFieldEnum = (typeof ClusterScalarFieldEnum)[keyof typeof ClusterScalarFieldEnum]


  export const DedicatedStorageScalarFieldEnum: {
    resourceId: 'resourceId',
    clusterId: 'clusterId',
    ownerId: 'ownerId',
    amount: 'amount'
  };

  export type DedicatedStorageScalarFieldEnum = (typeof DedicatedStorageScalarFieldEnum)[keyof typeof DedicatedStorageScalarFieldEnum]


  export const DeductionAuditLogScalarFieldEnum: {
    id: 'id',
    clusterId: 'clusterId',
    ownerId: 'ownerId',
    resourceId: 'resourceId',
    totalCost: 'totalCost',
    succeeded: 'succeeded',
    balanceAtEvent: 'balanceAtEvent',
    createdAt: 'createdAt'
  };

  export type DeductionAuditLogScalarFieldEnum = (typeof DeductionAuditLogScalarFieldEnum)[keyof typeof DeductionAuditLogScalarFieldEnum]


  export const ResourceRateCeilingScalarFieldEnum: {
    resourceId: 'resourceId',
    maxLegitRatePerSec: 'maxLegitRatePerSec',
    notes: 'notes'
  };

  export type ResourceRateCeilingScalarFieldEnum = (typeof ResourceRateCeilingScalarFieldEnum)[keyof typeof ResourceRateCeilingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ClusterWhereInput = {
    AND?: ClusterWhereInput | ClusterWhereInput[]
    OR?: ClusterWhereInput[]
    NOT?: ClusterWhereInput | ClusterWhereInput[]
    id?: StringFilter<"Cluster"> | string
    secret?: StringFilter<"Cluster"> | string
  }

  export type ClusterOrderByWithRelationInput = {
    id?: SortOrder
    secret?: SortOrder
  }

  export type ClusterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClusterWhereInput | ClusterWhereInput[]
    OR?: ClusterWhereInput[]
    NOT?: ClusterWhereInput | ClusterWhereInput[]
    secret?: StringFilter<"Cluster"> | string
  }, "id">

  export type ClusterOrderByWithAggregationInput = {
    id?: SortOrder
    secret?: SortOrder
    _count?: ClusterCountOrderByAggregateInput
    _max?: ClusterMaxOrderByAggregateInput
    _min?: ClusterMinOrderByAggregateInput
  }

  export type ClusterScalarWhereWithAggregatesInput = {
    AND?: ClusterScalarWhereWithAggregatesInput | ClusterScalarWhereWithAggregatesInput[]
    OR?: ClusterScalarWhereWithAggregatesInput[]
    NOT?: ClusterScalarWhereWithAggregatesInput | ClusterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cluster"> | string
    secret?: StringWithAggregatesFilter<"Cluster"> | string
  }

  export type DedicatedStorageWhereInput = {
    AND?: DedicatedStorageWhereInput | DedicatedStorageWhereInput[]
    OR?: DedicatedStorageWhereInput[]
    NOT?: DedicatedStorageWhereInput | DedicatedStorageWhereInput[]
    resourceId?: StringFilter<"DedicatedStorage"> | string
    clusterId?: StringFilter<"DedicatedStorage"> | string
    ownerId?: IntFilter<"DedicatedStorage"> | number
    amount?: IntFilter<"DedicatedStorage"> | number
  }

  export type DedicatedStorageOrderByWithRelationInput = {
    resourceId?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    amount?: SortOrder
  }

  export type DedicatedStorageWhereUniqueInput = Prisma.AtLeast<{
    clusterId_ownerId_resourceId?: DedicatedStorageClusterIdOwnerIdResourceIdCompoundUniqueInput
    AND?: DedicatedStorageWhereInput | DedicatedStorageWhereInput[]
    OR?: DedicatedStorageWhereInput[]
    NOT?: DedicatedStorageWhereInput | DedicatedStorageWhereInput[]
    resourceId?: StringFilter<"DedicatedStorage"> | string
    clusterId?: StringFilter<"DedicatedStorage"> | string
    ownerId?: IntFilter<"DedicatedStorage"> | number
    amount?: IntFilter<"DedicatedStorage"> | number
  }, "clusterId_ownerId_resourceId">

  export type DedicatedStorageOrderByWithAggregationInput = {
    resourceId?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    amount?: SortOrder
    _count?: DedicatedStorageCountOrderByAggregateInput
    _avg?: DedicatedStorageAvgOrderByAggregateInput
    _max?: DedicatedStorageMaxOrderByAggregateInput
    _min?: DedicatedStorageMinOrderByAggregateInput
    _sum?: DedicatedStorageSumOrderByAggregateInput
  }

  export type DedicatedStorageScalarWhereWithAggregatesInput = {
    AND?: DedicatedStorageScalarWhereWithAggregatesInput | DedicatedStorageScalarWhereWithAggregatesInput[]
    OR?: DedicatedStorageScalarWhereWithAggregatesInput[]
    NOT?: DedicatedStorageScalarWhereWithAggregatesInput | DedicatedStorageScalarWhereWithAggregatesInput[]
    resourceId?: StringWithAggregatesFilter<"DedicatedStorage"> | string
    clusterId?: StringWithAggregatesFilter<"DedicatedStorage"> | string
    ownerId?: IntWithAggregatesFilter<"DedicatedStorage"> | number
    amount?: IntWithAggregatesFilter<"DedicatedStorage"> | number
  }

  export type DeductionAuditLogWhereInput = {
    AND?: DeductionAuditLogWhereInput | DeductionAuditLogWhereInput[]
    OR?: DeductionAuditLogWhereInput[]
    NOT?: DeductionAuditLogWhereInput | DeductionAuditLogWhereInput[]
    id?: IntFilter<"DeductionAuditLog"> | number
    clusterId?: StringFilter<"DeductionAuditLog"> | string
    ownerId?: IntFilter<"DeductionAuditLog"> | number
    resourceId?: StringFilter<"DeductionAuditLog"> | string
    totalCost?: IntFilter<"DeductionAuditLog"> | number
    succeeded?: BoolFilter<"DeductionAuditLog"> | boolean
    balanceAtEvent?: IntFilter<"DeductionAuditLog"> | number
    createdAt?: DateTimeFilter<"DeductionAuditLog"> | Date | string
  }

  export type DeductionAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    resourceId?: SortOrder
    totalCost?: SortOrder
    succeeded?: SortOrder
    balanceAtEvent?: SortOrder
    createdAt?: SortOrder
  }

  export type DeductionAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DeductionAuditLogWhereInput | DeductionAuditLogWhereInput[]
    OR?: DeductionAuditLogWhereInput[]
    NOT?: DeductionAuditLogWhereInput | DeductionAuditLogWhereInput[]
    clusterId?: StringFilter<"DeductionAuditLog"> | string
    ownerId?: IntFilter<"DeductionAuditLog"> | number
    resourceId?: StringFilter<"DeductionAuditLog"> | string
    totalCost?: IntFilter<"DeductionAuditLog"> | number
    succeeded?: BoolFilter<"DeductionAuditLog"> | boolean
    balanceAtEvent?: IntFilter<"DeductionAuditLog"> | number
    createdAt?: DateTimeFilter<"DeductionAuditLog"> | Date | string
  }, "id">

  export type DeductionAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    resourceId?: SortOrder
    totalCost?: SortOrder
    succeeded?: SortOrder
    balanceAtEvent?: SortOrder
    createdAt?: SortOrder
    _count?: DeductionAuditLogCountOrderByAggregateInput
    _avg?: DeductionAuditLogAvgOrderByAggregateInput
    _max?: DeductionAuditLogMaxOrderByAggregateInput
    _min?: DeductionAuditLogMinOrderByAggregateInput
    _sum?: DeductionAuditLogSumOrderByAggregateInput
  }

  export type DeductionAuditLogScalarWhereWithAggregatesInput = {
    AND?: DeductionAuditLogScalarWhereWithAggregatesInput | DeductionAuditLogScalarWhereWithAggregatesInput[]
    OR?: DeductionAuditLogScalarWhereWithAggregatesInput[]
    NOT?: DeductionAuditLogScalarWhereWithAggregatesInput | DeductionAuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DeductionAuditLog"> | number
    clusterId?: StringWithAggregatesFilter<"DeductionAuditLog"> | string
    ownerId?: IntWithAggregatesFilter<"DeductionAuditLog"> | number
    resourceId?: StringWithAggregatesFilter<"DeductionAuditLog"> | string
    totalCost?: IntWithAggregatesFilter<"DeductionAuditLog"> | number
    succeeded?: BoolWithAggregatesFilter<"DeductionAuditLog"> | boolean
    balanceAtEvent?: IntWithAggregatesFilter<"DeductionAuditLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DeductionAuditLog"> | Date | string
  }

  export type ResourceRateCeilingWhereInput = {
    AND?: ResourceRateCeilingWhereInput | ResourceRateCeilingWhereInput[]
    OR?: ResourceRateCeilingWhereInput[]
    NOT?: ResourceRateCeilingWhereInput | ResourceRateCeilingWhereInput[]
    resourceId?: StringFilter<"ResourceRateCeiling"> | string
    maxLegitRatePerSec?: DecimalFilter<"ResourceRateCeiling"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"ResourceRateCeiling"> | string | null
  }

  export type ResourceRateCeilingOrderByWithRelationInput = {
    resourceId?: SortOrder
    maxLegitRatePerSec?: SortOrder
    notes?: SortOrderInput | SortOrder
  }

  export type ResourceRateCeilingWhereUniqueInput = Prisma.AtLeast<{
    resourceId?: string
    AND?: ResourceRateCeilingWhereInput | ResourceRateCeilingWhereInput[]
    OR?: ResourceRateCeilingWhereInput[]
    NOT?: ResourceRateCeilingWhereInput | ResourceRateCeilingWhereInput[]
    maxLegitRatePerSec?: DecimalFilter<"ResourceRateCeiling"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableFilter<"ResourceRateCeiling"> | string | null
  }, "resourceId">

  export type ResourceRateCeilingOrderByWithAggregationInput = {
    resourceId?: SortOrder
    maxLegitRatePerSec?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: ResourceRateCeilingCountOrderByAggregateInput
    _avg?: ResourceRateCeilingAvgOrderByAggregateInput
    _max?: ResourceRateCeilingMaxOrderByAggregateInput
    _min?: ResourceRateCeilingMinOrderByAggregateInput
    _sum?: ResourceRateCeilingSumOrderByAggregateInput
  }

  export type ResourceRateCeilingScalarWhereWithAggregatesInput = {
    AND?: ResourceRateCeilingScalarWhereWithAggregatesInput | ResourceRateCeilingScalarWhereWithAggregatesInput[]
    OR?: ResourceRateCeilingScalarWhereWithAggregatesInput[]
    NOT?: ResourceRateCeilingScalarWhereWithAggregatesInput | ResourceRateCeilingScalarWhereWithAggregatesInput[]
    resourceId?: StringWithAggregatesFilter<"ResourceRateCeiling"> | string
    maxLegitRatePerSec?: DecimalWithAggregatesFilter<"ResourceRateCeiling"> | Decimal | DecimalJsLike | number | string
    notes?: StringNullableWithAggregatesFilter<"ResourceRateCeiling"> | string | null
  }

  export type ClusterCreateInput = {
    id: string
    secret: string
  }

  export type ClusterUncheckedCreateInput = {
    id: string
    secret: string
  }

  export type ClusterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
  }

  export type ClusterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
  }

  export type ClusterCreateManyInput = {
    id: string
    secret: string
  }

  export type ClusterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
  }

  export type ClusterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
  }

  export type DedicatedStorageCreateInput = {
    resourceId: string
    clusterId: string
    ownerId: number
    amount: number
  }

  export type DedicatedStorageUncheckedCreateInput = {
    resourceId: string
    clusterId: string
    ownerId: number
    amount: number
  }

  export type DedicatedStorageUpdateInput = {
    resourceId?: StringFieldUpdateOperationsInput | string
    clusterId?: StringFieldUpdateOperationsInput | string
    ownerId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type DedicatedStorageUncheckedUpdateInput = {
    resourceId?: StringFieldUpdateOperationsInput | string
    clusterId?: StringFieldUpdateOperationsInput | string
    ownerId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type DedicatedStorageCreateManyInput = {
    resourceId: string
    clusterId: string
    ownerId: number
    amount: number
  }

  export type DedicatedStorageUpdateManyMutationInput = {
    resourceId?: StringFieldUpdateOperationsInput | string
    clusterId?: StringFieldUpdateOperationsInput | string
    ownerId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type DedicatedStorageUncheckedUpdateManyInput = {
    resourceId?: StringFieldUpdateOperationsInput | string
    clusterId?: StringFieldUpdateOperationsInput | string
    ownerId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type DeductionAuditLogCreateInput = {
    clusterId: string
    ownerId: number
    resourceId: string
    totalCost: number
    succeeded: boolean
    balanceAtEvent: number
    createdAt?: Date | string
  }

  export type DeductionAuditLogUncheckedCreateInput = {
    id?: number
    clusterId: string
    ownerId: number
    resourceId: string
    totalCost: number
    succeeded: boolean
    balanceAtEvent: number
    createdAt?: Date | string
  }

  export type DeductionAuditLogUpdateInput = {
    clusterId?: StringFieldUpdateOperationsInput | string
    ownerId?: IntFieldUpdateOperationsInput | number
    resourceId?: StringFieldUpdateOperationsInput | string
    totalCost?: IntFieldUpdateOperationsInput | number
    succeeded?: BoolFieldUpdateOperationsInput | boolean
    balanceAtEvent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeductionAuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clusterId?: StringFieldUpdateOperationsInput | string
    ownerId?: IntFieldUpdateOperationsInput | number
    resourceId?: StringFieldUpdateOperationsInput | string
    totalCost?: IntFieldUpdateOperationsInput | number
    succeeded?: BoolFieldUpdateOperationsInput | boolean
    balanceAtEvent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeductionAuditLogCreateManyInput = {
    id?: number
    clusterId: string
    ownerId: number
    resourceId: string
    totalCost: number
    succeeded: boolean
    balanceAtEvent: number
    createdAt?: Date | string
  }

  export type DeductionAuditLogUpdateManyMutationInput = {
    clusterId?: StringFieldUpdateOperationsInput | string
    ownerId?: IntFieldUpdateOperationsInput | number
    resourceId?: StringFieldUpdateOperationsInput | string
    totalCost?: IntFieldUpdateOperationsInput | number
    succeeded?: BoolFieldUpdateOperationsInput | boolean
    balanceAtEvent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeductionAuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clusterId?: StringFieldUpdateOperationsInput | string
    ownerId?: IntFieldUpdateOperationsInput | number
    resourceId?: StringFieldUpdateOperationsInput | string
    totalCost?: IntFieldUpdateOperationsInput | number
    succeeded?: BoolFieldUpdateOperationsInput | boolean
    balanceAtEvent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceRateCeilingCreateInput = {
    resourceId: string
    maxLegitRatePerSec: Decimal | DecimalJsLike | number | string
    notes?: string | null
  }

  export type ResourceRateCeilingUncheckedCreateInput = {
    resourceId: string
    maxLegitRatePerSec: Decimal | DecimalJsLike | number | string
    notes?: string | null
  }

  export type ResourceRateCeilingUpdateInput = {
    resourceId?: StringFieldUpdateOperationsInput | string
    maxLegitRatePerSec?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRateCeilingUncheckedUpdateInput = {
    resourceId?: StringFieldUpdateOperationsInput | string
    maxLegitRatePerSec?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRateCeilingCreateManyInput = {
    resourceId: string
    maxLegitRatePerSec: Decimal | DecimalJsLike | number | string
    notes?: string | null
  }

  export type ResourceRateCeilingUpdateManyMutationInput = {
    resourceId?: StringFieldUpdateOperationsInput | string
    maxLegitRatePerSec?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRateCeilingUncheckedUpdateManyInput = {
    resourceId?: StringFieldUpdateOperationsInput | string
    maxLegitRatePerSec?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ClusterCountOrderByAggregateInput = {
    id?: SortOrder
    secret?: SortOrder
  }

  export type ClusterMaxOrderByAggregateInput = {
    id?: SortOrder
    secret?: SortOrder
  }

  export type ClusterMinOrderByAggregateInput = {
    id?: SortOrder
    secret?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DedicatedStorageClusterIdOwnerIdResourceIdCompoundUniqueInput = {
    clusterId: string
    ownerId: number
    resourceId: string
  }

  export type DedicatedStorageCountOrderByAggregateInput = {
    resourceId?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    amount?: SortOrder
  }

  export type DedicatedStorageAvgOrderByAggregateInput = {
    ownerId?: SortOrder
    amount?: SortOrder
  }

  export type DedicatedStorageMaxOrderByAggregateInput = {
    resourceId?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    amount?: SortOrder
  }

  export type DedicatedStorageMinOrderByAggregateInput = {
    resourceId?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    amount?: SortOrder
  }

  export type DedicatedStorageSumOrderByAggregateInput = {
    ownerId?: SortOrder
    amount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DeductionAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    resourceId?: SortOrder
    totalCost?: SortOrder
    succeeded?: SortOrder
    balanceAtEvent?: SortOrder
    createdAt?: SortOrder
  }

  export type DeductionAuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    totalCost?: SortOrder
    balanceAtEvent?: SortOrder
  }

  export type DeductionAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    resourceId?: SortOrder
    totalCost?: SortOrder
    succeeded?: SortOrder
    balanceAtEvent?: SortOrder
    createdAt?: SortOrder
  }

  export type DeductionAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    clusterId?: SortOrder
    ownerId?: SortOrder
    resourceId?: SortOrder
    totalCost?: SortOrder
    succeeded?: SortOrder
    balanceAtEvent?: SortOrder
    createdAt?: SortOrder
  }

  export type DeductionAuditLogSumOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    totalCost?: SortOrder
    balanceAtEvent?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ResourceRateCeilingCountOrderByAggregateInput = {
    resourceId?: SortOrder
    maxLegitRatePerSec?: SortOrder
    notes?: SortOrder
  }

  export type ResourceRateCeilingAvgOrderByAggregateInput = {
    maxLegitRatePerSec?: SortOrder
  }

  export type ResourceRateCeilingMaxOrderByAggregateInput = {
    resourceId?: SortOrder
    maxLegitRatePerSec?: SortOrder
    notes?: SortOrder
  }

  export type ResourceRateCeilingMinOrderByAggregateInput = {
    resourceId?: SortOrder
    maxLegitRatePerSec?: SortOrder
    notes?: SortOrder
  }

  export type ResourceRateCeilingSumOrderByAggregateInput = {
    maxLegitRatePerSec?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}