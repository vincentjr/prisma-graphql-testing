async function feed(parent, args, context) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};
  const links = context.prisma.link.findMany({
    where: where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });

  const count = context.prisma.link.count({ where: where });

  return {
    links: links,
    count: count,
  };
}

module.exports = {
  feed,
};
