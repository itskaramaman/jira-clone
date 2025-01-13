"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const UserSearch = () => {
  const [email, setEmail] = useState("");

  return (
    <div>
      <Label>Search User</Label>
      <div className="flex gap-5">
        <Input
          type="email"
          placeholder="joe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="bgBlue">Invite</Button>
      </div>
    </div>
  );
};

export default UserSearch;
