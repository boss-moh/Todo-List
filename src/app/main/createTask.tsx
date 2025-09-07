{
  /* Sheet component for task form */
}
<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>{editingTask ? "Edit Task" : "Create New Task"}</SheetTitle>
      <SheetDescription>
        {editingTask
          ? "Update your task details below."
          : "Add a new task to your list."}
      </SheetDescription>
    </SheetHeader>

    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="daysLeft">Days Left</Label>
        <Input
          id="daysLeft"
          type="number"
          min="1"
          value={formData.daysLeft}
          onChange={(e) =>
            setFormData({
              ...formData,
              daysLeft: Number.parseInt(e.target.value) || 1,
            })
          }
          placeholder="Enter days left"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={formData.priority}
          onValueChange={(value: "high" | "medium" | "low") =>
            setFormData({ ...formData, priority: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {editingTask ? "Update Task" : "Create Task"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsSheetOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  </SheetContent>
</Sheet>;
