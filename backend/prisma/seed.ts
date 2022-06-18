import { PrismaClient, Prisma } from "@prisma/client";
import * as argon2 from "argon2";
const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";
import { getStockStatus } from "../src/helpers/itemHelper";

const permissions = [
  "read-dashboard", //0
  "read-stock-alert", //1
  "create-item", //2
  "read-item", //3
  "update-item", //4
  "delete-item", //5
  "create-po-request", //6
  "read-po-request", //7
  "update-po-request", //8
  "delete-po-request", //9
  "create-employee", //10
  "read-employee", //11
  "update-employee", //12
  "delete-employee", //13
  "create-category", //14
  "read-category", //15
  "update-category", //16
  "delete-category", //17
  "create-supplier", //18
  "read-supplier", //19
  "update-supplier", //20
  "delete-supplier", //21
  "create-position", //22
  "read-position", //23
  "update-position", //24
  "delete-position", //25
  "create-brand", //26
  "read-brand", //27
  "update-brand", //28
  "delete-brand", //29
  "create-storage-location", //30
  "read-storage-location", //31
  "update-storage-location", //32
  "delete-storage-location", //33
  "read-settings", //34
  "read-customer",
  "create-customer",
  "delete-customer",
  "update-customer",
  "read-order",
  "create-order",
  "delete-order",
  "update-order",
  "read-transaction",
  "create-transaction",
  "delete-transaction",
  "update-transaction",
  "read-menu-item",
  "create-menu-item",
  "update-menu-item",
  "delete-menu-item",
  "read-menu-item-category",
  "create-menu-item-category",
  "update-menu-item-category",
  "delete-menu-item-category",
  "read-menu-item-stock",
  "update-menu-item-stock",
  "delete-menu-item-stock",
  "read-table",
  "create-table",
  "update-table",
  "delete-table",
  "read-invoice",
  "create-invoice",
  "update-invoice",
  "delete-invoice",
  "read-equipment-item",
  "create-equipment-item",
  "delete-equipment-item",
  "update-equipment-item",
  "read-equipment-item-category",
  "create-equipment-item-category",
  "update-equipment-item-category",
  "delete-equipment-item-category",
  "create-branch", //26
  "read-branch", //27
  "update-branch", //28
  "delete-branch", //29
];

const rolesData: Prisma.RoleCreateInput[] = [
  {
    name: "administrator",
    permissions: {
      connect: permissions.map((p, i) => ({ id: Number(i + 1) })) as any,
    },
  },
  {
    name: "developer",
    permissions: {
      connect: permissions.map((p, i) => ({ id: Number(i + 1) })) as any,
    },
  },
  {
    name: "attendant",
    permissions: {
      connect: permissions
        .map((p) => ({ name: p }))
        .filter((p) => {
          return ["employee", "position"].every((sub) => !p.name.includes(sub));
        }) as any,
    },
  },
  {
    name: "guest",
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    username: "shydan_bot",
    password: "password",
    employee: {
      create: {
        fname: "Shydan",
        address: "Shydan",
        lname: "Bot",
        mname: "Developer",
        phone: "520-666-555",
        branch: {
          create: {
            name: "BRANCH-1",
            address: "Fake Address, Unknown City"
          }
        },
        position: {
          create: {
            name: "Shydan Bot",
          },
        },
      },
    },
    roles: {
      connect: {
        name: "administrator",
      },
    },
  },
  {
    username: "admin",
    password: "password",
    employee: {
      create: {
        fname: "Anna",
        address: "Fake address",
        lname: "Montana",
        mname: "Gabriel",
        phone: "520-666-555",
        branch: {
          create: {
            name: "BRANCH-2",
            address: "Fake Address, Unknown City"
          }
        },
        position: {
          create: {
            name: "CEO",
          },
        },
      },
    },
    roles: {
      connect: {
        name: "administrator",
      },
    },
  },
  {
    username: "attendant",
    password: "password",
    employee: {
      create: {
        fname: "Joshua",
        address: "Fake address",
        lname: "Loberto",
        mname: "Andie",
        phone: "520-666-333",
        branch: {
          create: {
            name: "BRANCH-3",
            address: "Fake Address 3, Unknown City"
          }
        },
        position: {
          create: {
            name: "Human Resource",
          },
        },
      },
    },
    roles: {
      connect: {
        name: "attendant",
      },
    },
  },
  {
    username: "developer",
    password: "password",
    employee: {
      create: {
        fname: "Ryan",
        address: "Fake address 2",
        lname: "Tillaman",
        mname: "Ben",
        phone: "520-111-555",
        branch: {
          create: {
            name: "BRANCH-4",
            address: "Fake Address, Unknown City"
          }
        },
        position: {
          create: {
            name: "Web Developer",
          },
        },
      },
    },
    roles: {
      connect: {
        name: "developer",
      },
    },
  },
  {
    username: "guest",
    password: "password",
    employee: {
      create: {
        fname: "Gerona",
        address: "Fake address 2",
        lname: "Lambor",
        mname: "Jin",
        phone: "520-222-555",
        branch: {
          create: {
            name: "BRANCH-5",
            address: "Fake Address, Unknown City"
          }
        },
        position: {
          create: {
            name: "Janitor",
          },
        },
      },
    },
    roles: {
      connect: {
        name: "guest",
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  const hashedPassword = await argon2.hash("password");

  for (const p of permissions) {
    const permission = await prisma.permission.create({
      data: {
        name: p,
      },
    });
    console.log(`Created permission with id: ${permission.id}`);
  }

  for (const r of rolesData) {
    const role = await prisma.role.create({
      data: {
        name: r.name,
        permissions: r.permissions,
      },
    });
    console.log(`Created role with id: ${role.id}`);
  }
  for (const u of userData) {
    const user = await prisma.user.create({
      data: {
        username: u.username,
        password: hashedPassword,
        employee: u.employee,
        roles: u.roles,
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }

  const itemLength = 100;
  for (let i = 0; i < itemLength; i++) {
    let cost_price = faker.datatype.number({ precision: 0.01, max: 1000 });
    let selling_price = cost_price + cost_price * 0.25;
    let qty = faker.datatype.number({ max: 100 });
    let stock_alert_ctr = faker.datatype.number({ min: 10, max: 3000 });
    let status: any = getStockStatus(qty, stock_alert_ctr);
    let condition: "GOOD" | "EXPIRED" = "GOOD";
    let expiry_date = faker.date.between(
      "2020-01-01T00:00:00.000Z",
      "2024-01-01T00:00:00.000Z"
    );
    if (new Date().getTime() > expiry_date.getTime()) {
      condition = "EXPIRED";
    }

    const item = await prisma.item.create({
      data: {
        item_transactions: {
          create: {
            qty,
            expiry_date,
            condition,
            date_received: faker.date.between(
              "2015-01-01T00:00:00.000Z",
              "2021-01-01T00:00:00.000Z"
            ),
          },
        },
        qty,
        cost_price,
        selling_price,
        name: faker.commerce.productName() + ` - ${i}`,
        status,
        stock_alert_ctr,
        brand: {
          create: {
            name: faker.company.companyName() + ` - ${i}`,
          },
        },
        company: {
          create: {
            name: faker.company.companyName() + ` - ${i}`,
            address:
              faker.address.cityName() +
              ", " +
              faker.address.state() +
              ", " +
              faker.address.country(),
            phone: faker.phone.phoneNumber("+639#########"),
            representative: {
              create: {
                fname: faker.name.firstName(),
                address:
                  faker.address.cityName() +
                  ", " +
                  faker.address.state() +
                  ", " +
                  faker.address.country(),
                lname: faker.name.lastName(),
                mname: faker.name.middleName(),
                phone: faker.phone.phoneNumber("+639#########"),
              },
            },
          },
        },
        category: {
          create: {
            name: `${i} - ${faker.commerce.color()} & ${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()}`,
          },
        },
        storage_location: {
          create: {
            name: faker.company.companyName() + ` - ${i}`,
            address:
              faker.address.cityName() +
              ", " +
              faker.address.state() +
              ", " +
              faker.address.country(),
          },
        },
      },
    });
    console.log(`Created item with id: ${item.id}`);
  }


  for (let i = 0; i < 20; i++) {
    const position_name = faker.name.jobType();
    const brand_name = `BRANCH-${faker.datatype.number({ min: 1, max: 5 })}`
    console.log(brand_name)
    const po = await prisma.pO_Request.create({
      data: {
        remarks: faker.commerce.productDescription(),
        reason: faker.random.arrayElement([
          "OVERSTOCKING",
          "EXPIRED",
          "BAD_ORDER",
          "OTHERS",
        ]),
        storage_location: {
          create: {
            name: faker.company.companyName() + ` - ${i}`,
            address:
              faker.address.cityName() +
              ", " +
              faker.address.state() +
              ", " +
              faker.address.country(),
          },
        },
        qty: faker.datatype.number({ min: 1, max: 30 }),
        request_no: faker.phone.phoneNumber("POR-###-####"),
        item_transaction: {
          connect: {
            id: faker.datatype.number({ min: 1, max: itemLength - 1 }),
          },
        },
        attendant: {
          create: {
            fname: faker.name.firstName(),
            address:
              faker.address.cityName() +
              ", " +
              faker.address.state() +
              ", " +
              faker.address.country(),
            lname: faker.name.lastName(),
            mname: faker.name.middleName(),
            phone: faker.phone.phoneNumber("+639#########"),
            branch: {
              connectOrCreate: {
                where: {
                  name: brand_name,
                },
                create: {
                  name: brand_name,
                  address: "Fake Address"
                },
              },
            },
            position: {
              connectOrCreate: {
                where: {
                  name: position_name,
                },
                create: {
                  name: position_name,
                },
              },
            },
          },
        },
      },
    });

    console.log(`Created po with id: ${po.id}`);
  }

  const menuItemLength = 20;

  for (let i = 0; i < menuItemLength; i++) {
    let qty = faker.datatype.number({ max: 100 });
    let category = faker.commerce.productMaterial();
    let cost_price = faker.datatype.number({ precision: 0.01, max: 1000 });
    let selling_price = cost_price + cost_price * 0.25;
    const menuItem = await prisma.menuItem.create({
      data: {
        qty,
        cost_price,
        selling_price,
        image_url: faker.image.imageUrl(640, 480, "food"),
        name: faker.commerce.productName() + ` - ${i}`,
        menu_item_category: {
          connectOrCreate: {
            where: {
              name: category,
            },
            create: {
              name: category,
            },
          },
        },
      },
    });
    console.log(`Created menuItem with id: ${menuItem.id}`);
  }

  // equipment Item Faker
  for (let i = 0; i < 20; i++) {
    let qty = faker.datatype.number({ max: 100 });
    let category = faker.commerce.productMaterial();
    let cost_price = faker.datatype.number({ precision: 0.01, max: 1000 });
    let remarks = faker.random.arrayElement([
      "OVERSTOCKING",
      "EXPIRED",
      "BAD_ORDER",
      "OTHERS",
    ])
    let selling_price = cost_price + cost_price * 0.25;
    const equipment = await prisma.equipment.create({
      data: {
        qty,
        cost_price,
        selling_price,
        image_url: faker.image.imageUrl(640, 480, "food"),
        name: faker.commerce.productName() + ` - ${i}`,
        equipment_category: {
          connectOrCreate: {
            where: {
              name: category,
            },
            create: {
              name: category,
            },
          },
        },
      },
    });
    console.log(`Created Equipment Item with id: ${equipment.id}`);
  }


  for (let i = 0; i < 10; i++) {
    const table = await prisma.table.create({
      data: {
        capacity: 4,
        name: faker.random.alpha({ upcase: true }) + i,
      },
    });
    console.log(`Created table with id: ${table.id}`);
  }

  console.log(`Seeding finished.`);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
